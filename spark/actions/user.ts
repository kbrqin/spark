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
    .select("id, username, exp, level, stars")
    .eq("id", user.id)
    .single();

  if (error || !profile) return null;
  return profile;
}
