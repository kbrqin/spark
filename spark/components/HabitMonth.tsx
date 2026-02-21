import { Habit } from "@/types/types"
import HabitRow from "./HabitRow"

interface HabitMonthProps {
  habits: Habit[]
}

export default function HabitMonth({ habits }: HabitMonthProps) {
  return (
    <div>
      {habits.map((habit) => (
        <HabitRow key={habit.id} habit={habit} />
      ))}
    </div>
  )
}
