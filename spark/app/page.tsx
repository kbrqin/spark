import { sbGetHabitsForDashboard } from "@/actions/habit"
import DashboardClient from "./DashboardClient"

export default async function Home() {
  const habits = await sbGetHabitsForDashboard()

  return <DashboardClient habits={habits} />
}
