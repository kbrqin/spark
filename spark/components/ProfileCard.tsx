import ProgressBar from "@/components/ProgressBar";

interface ProfileCardProps {
  username: string;
  exp: number;
  level: number;
  stars: number;
}

export default function ProfileCard({ username, exp, level, stars }: ProfileCardProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-gray-300 rounded-md" />

      <div className="flex-1">
        <p className="font-medium">{username}</p>
        <div className="flex items-center justify-between gap-x-2 text-xs text-gray-500">
          <span>Lvl {level}</span>
          <span>⋅</span>
          <span>{stars} ⭐</span>
        </div>
        <ProgressBar value={exp} max={level * 100} />
      </div>
    </div>
  );
}
