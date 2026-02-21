"use client";

import { Habit } from "@/types/types";
import { useTransition, useState } from "react";
import { sbToggleHabitToday } from "@/actions/habit";

interface HabitCheckboxProps {
  habit: Habit;
}

export default function HabitCheckbox({ habit }: HabitCheckboxProps) {
  const [pending, startTransition] = useTransition();

  const [checked, setChecked] = useState(habit.completedToday);

  const handleToggle = () => {
    const next = !checked;

    setChecked(next);

    startTransition(async () => {
      try {
        await sbToggleHabitToday(habit.id);
      } catch {
        // rollback if fail
        setChecked(!next);
      }
    });
  };

  return (
    <div className="flex items-center justify-between py-2">
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleToggle}
          disabled={pending}
          className="w-4 h-4 rounded"
        />
        <span className={pending ? "opacity-50" : ""}>
          {habit.name}
        </span>
      </label>

      <div className="flex items-center gap-2 text-sm">
        {habit.dueTime && (
          <span className="bg-yellow-100 px-2 py-0.5 rounded text-xs">
            DUE {habit.dueTime}
          </span>
        )}
        <span>🔥 {habit.streak}</span>
        <button className="text-gray-400 hover:text-gray-600">⋯</button>
      </div>
    </div>
  );
}
