export interface Habit {
  id: string
  name: string
  streak: number
  completedToday?: boolean
  dueTime?: string
  completedDays: boolean[]
}

export interface Friend {
  id: string;
  name: string;
  incompleteCount: number;
  nextDue?: string | null;
  exp: number;
  level: number;
  stars: number;
}

export interface Profile {
  id: string;
  username: string;
  exp: number;
  level: number;
  stars: number;
}
