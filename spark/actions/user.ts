"use server";

import { createClient } from "@/utils/supabase/server";
import { Profile } from "@/types/types";

export async function sbGetCurrentProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, username, exp, level, stars, double_stars_purchased")
    .eq("id", user.id)
    .single();

  if (error || !profile) return null;
  return profile;
}

export async function sbMarkDoubleStarsPurchased() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  console.log("user id" , user.id);

  const { data, error } = await supabase
    .from("profiles")
    .update({ double_stars_purchased: true })
    .eq("id", user.id).select().single();

  if (error || !data) {
    console.log("failed to mark double stars purchased");
  }

  return true;
}
