import { Friend } from "@/types/types"
import ProgressBar from "@/components/ProgressBar";

interface FriendCardProps {
  friend: Friend
}


export default function FriendCard({ friend }: FriendCardProps) {
  return (
    <div className="flex gap-4 p-4 rounded-xl border">
      <div className="w-12 h-12 bg-gray-300 rounded-md" />

      <div className="flex-1">
        <div className="flex justify-between">
          <p className="font-medium">{friend.name}</p>
          <button className="text-gray-400">…</button>
        </div>

        <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
          <span>Lvl {friend.level ?? 1}</span>
        </div>
        <ProgressBar value={friend.exp} max={friend.level * 100} />

        <p className="text-sm text-gray-600 mt-1">
          {friend.incompleteCount} incomplete habits
        </p>

        {friend.nextDue && (
          <p className="text-sm text-red-500">
            ❗ 1 habit due at {friend.nextDue}
          </p>
        )}

        <button className="mt-2 bg-teal-400 text-white px-3 py-1 rounded-lg text-sm">
          send reminder ⭐
        </button>
      </div>
    </div>
  );
}
