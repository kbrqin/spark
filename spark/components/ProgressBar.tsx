interface ProgressBarProps {
  value: number; // current exp
  max: number; // exp required for next level
}

export default function ProgressBar({ value, max }: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
      <div
        className="bg-teal-500 h-2 rounded-full"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}
