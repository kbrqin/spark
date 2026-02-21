import { Habit } from "@/types/types"

interface HabitRowProps {
  habit: Habit
}

export default function HabitRow({ habit }: HabitRowProps) {
  return (
    <div className="mb-6">
      <p className="font-medium mb-2">{habit.name}</p>

      <div className="flex gap-2 flex-wrap">
        {habit.completedDays.map((done, i) => (
          <span
            key={i}
            className={`text-sm ${
              done ? "text-black" : "text-gray-300"
            }`}
          >
            {done ? "X" : `${i + 1}`}
          </span>
        ))}
      </div>
    </div>
  )
}