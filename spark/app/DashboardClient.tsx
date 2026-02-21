"use client";

import { useState, useEffect, useCallback } from "react";
import LoginButton from "@/components/LoginLogoutButton";
import UserGreetText from "@/components/UserGreetText";
import useFcmToken from "@/hooks/useFcmToken";
import { Button } from "@/components/ui/button";

import SectionCard from "@/components/SectionCard";
import HabitMonth from "@/components/HabitMonth";
import HabitCheckbox from "@/components/HabitCheckbox";
import FriendCard from "@/components/FriendCard";
import ProfileCard from "@/components/ProfileCard";

import CreateHabitDialog from "@/components/CreateHabitDialog";
import AddFriendDialog from "@/components/AddFriendDialog";

import type { Habit, Friend, Profile } from "@/types/types";
import { sbGetFriendsForDashboard } from "@/actions/friends";
import { sbGetCurrentProfile } from "@/actions/user";
// import { sbGetCurrentUsername } from "@/actions/user";

interface Props {
  habits: Habit[];
}

export default function DashboardClient({ habits }: Props) {
  const [createOpen, setCreateOpen] = useState(false);
  const [addFriendOpen, setAddFriendOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [friends, setFriends] = useState<Friend[]>([]);
  const { token, notificationPermissionStatus } = useFcmToken();

  const fetchFriends = useCallback(async () => {
    const friendsData = await sbGetFriendsForDashboard();
    setFriends(friendsData);
  }, []);

  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const p = await sbGetCurrentProfile();
      setProfile(p);
      setUsername(p?.username ?? null);
    };
    fetchProfile();
  }, []);

  const handleTestNotification = async () => {
    await fetch("/send-notification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        title: "Test Notification",
        message: "This is a test notification",
        link: "/contact",
      }),
    });
  };

  return (
    <main className="flex flex-col h-screen overflow-hidden bg-gray-50 p-6 md:p-10">
      <div className="flex items-center justify-between mb-8">
        {username ? `hi ${username}!` : "hey you!"}
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-2 flex flex-col">
          <SectionCard
            title="this month"
            className="flex-1 flex flex-col overflow-hidden"
          >
            <div className="flex-1 overflow-y-auto pr-2">
              <HabitMonth habits={habits} />
            </div>
          </SectionCard>

          <div className="mt-auto pt-6">
            <SectionCard className="flex-1 flex flex-row justify-between items-center">
              <ProfileCard
                username={username ?? "hey you!"}
                exp={profile?.exp ?? 0} // fetch current user's exp/level/stars
                level={profile?.level ?? 1}
                stars={profile?.stars ?? 0}
              />
              <LoginButton />
            </SectionCard>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6 overflow-y-auto min-h-0 pr-2">
          <SectionCard
            title="today"
            action={
              <button
                className="w-6 h-6 text-sm font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-200"
                onClick={() => setCreateOpen(true)}
              >
                +
              </button>
            }
          >
            <div className="space-y-1">
              {habits.map((h) => (
                <HabitCheckbox key={h.id} habit={h} />
              ))}
            </div>
          </SectionCard>

          <SectionCard
            title="friends"
            action={
              <button
                className="w-6 h-6 text-sm font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-200"
                onClick={() => setAddFriendOpen(true)}
              >
                +
              </button>
            }
          >
            <div className="space-y-4">
              {friends.map((f) => (
                <FriendCard key={f.id} friend={f} />
              ))}
            </div>
          </SectionCard>

          <SectionCard title="notifications (dev)">
            <div className="space-y-3 text-sm">
              {notificationPermissionStatus === "granted" ? (
                <p className="text-green-600">
                  Permission granted for notifications.
                </p>
              ) : notificationPermissionStatus !== null ? (
                <p className="text-yellow-600">
                  Notifications not enabled in browser.
                </p>
              ) : null}

              <Button
                disabled={!token}
                onClick={handleTestNotification}
                className="w-full"
              >
                Send Test Notification
              </Button>
            </div>
          </SectionCard>
        </div>
      </div>

      <CreateHabitDialog open={createOpen} onOpenChange={setCreateOpen} />
      <AddFriendDialog
        open={addFriendOpen}
        onOpenChange={setAddFriendOpen}
        onFriendAdded={fetchFriends}
      />
    </main>
  );
}
