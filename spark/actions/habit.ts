"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

function getDaysInMonth(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function calculateStreak(logDates: string[]) {
  if (!logDates.length) return 0;

  const sorted = logDates
    .map((d) => new Date(d))
    .sort((a, b) => b.getTime() - a.getTime());

  let streak = 0;
  let cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  for (const d of sorted) {
    const logDay = new Date(d);
    logDay.setHours(0, 0, 0, 0);

    if (logDay.getTime() === cursor.getTime()) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else if (logDay < cursor) {
      break;
    }
  }

  return streak;
}

export async function sbGetHabitsForDashboard() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;

  if (!user) return [];

  const { data: habits } = await supabase
    .from("habits")
    .select("*")
    .order("created_at");

  if (!habits?.length) return [];

  const habitIds = habits.map((h) => h.id);

  const { data: logs } = await supabase
    .from("habit_logs")
    .select("habit_id, completed_at")
    .in("habit_id", habitIds);

  const logsByHabit = new Map<string, string[]>();

  logs?.forEach((log) => {
    if (!logsByHabit.has(log.habit_id)) {
      logsByHabit.set(log.habit_id, []);
    }
    logsByHabit.get(log.habit_id)!.push(log.completed_at);
  });

  const daysInMonth = getDaysInMonth();
  const today = new Date().toISOString().slice(0, 10);

  return habits.map((habit) => {
    const habitLogs = logsByHabit.get(habit.id) ?? [];

    const completedDays = Array(daysInMonth).fill(false);

    habitLogs.forEach((dateStr) => {
      const d = new Date(dateStr);
      const now = new Date();

      if (
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
      ) {
        completedDays[d.getDate() - 1] = true;
      }
    });

    const completedToday = habitLogs.includes(today);

    return {
      id: habit.id,
      name: habit.name,
      dueTime: habit.due_time ?? undefined,
      streak: calculateStreak(habitLogs),
      completedDays,
      completedToday,
    };
  });
}

export async function sbToggleHabitToday(habitId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const today = new Date().toISOString().slice(0, 10);
  
  const { data: existing } = await supabase
    .from("habit_logs")
    .select("id")
    .eq("habit_id", habitId)
    .eq("completed_at", today)
    .maybeSingle();

  if (existing) {
    await supabase.from("habit_logs").delete().eq("id", existing.id);
  } else {
    await supabase.from("habit_logs").insert({
      habit_id: habitId,
      user_id: user.id,
      completed_at: today,
    });
  }

  revalidatePath("/");
}

export async function sbCreateHabit(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const name = formData.get("name") as string;
  const dueTime = formData.get("dueTime") as string | null;

  if (!name?.trim()) {
    throw new Error("Habit name required");
  }

  await supabase.from("habits").insert({
    user_id: user.id,
    name: name.trim(),
    due_time: dueTime || null,
  });

  revalidatePath("/");
}
