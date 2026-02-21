"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

import { Friend } from "@/types/types";
import { FriendError } from "@/types/errors";

export async function sbAddFriendByUsername(username: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false, error: FriendError.NotAuthenticated };
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username)
    .single();

  if (error || !profile) {
    return { ok: false, error: FriendError.InvalidUsername };
  }

  if (profile.id === user.id) {
    return { ok: false, error: FriendError.CannotAddSelf };
  }

  const { error: insertError } = await supabase.from("friendships").insert({
    requester_id: user.id,
    addressee_id: profile.id,
    status: "pending",
  });

  if (insertError) {
    return { ok: false, error: FriendError.UnknownError };
  }

  return { ok: true };
}
export async function sbGetFriendsForDashboard(): Promise<Friend[]> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: friendships, error } = await supabase
    .from("friendships")
    .select(`id, requester_id, addressee_id`)
    .or(`requester_id.eq.${user.id},addressee_id.eq.${user.id}`);
  if (error || !friendships) return [];

  const friendIds = friendships.map((f) =>
    f.requester_id === user.id ? f.addressee_id : f.requester_id
  );

  const { data: profiles, error: profileError } = await supabase
    .from("profiles")
    .select("id, username, exp, level, stars")
    .in("id", friendIds);
  if (profileError || !profiles) return [];

  const profileMap = new Map(profiles.map((p) => [p.id, p]));

  return friendships.map((f) => {
    const isRequester = f.requester_id === user.id;
    const friendId = isRequester ? f.addressee_id : f.requester_id;
    const profile = profileMap.get(friendId);

    return {
      id: friendId,
      name: profile?.username ?? "unknown",
      incompleteCount: 0,
      nextDue: undefined,
      exp: profile?.exp ?? 0,
      level: profile?.level ?? 1,
      stars: profile?.stars ?? 0,
    };
  });
}
