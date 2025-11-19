// ============= USER & AUTH =============
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: Date
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

// ============= CALENDAR =============
export enum EventType {
  GYM = 'gym',
  WORK = 'work',
  APPOINTMENT = 'appointment',
  FAMILY = 'family',
  LOVE = 'love',
  STUDY = 'study',
}

export interface CalendarEvent {
  id: string
  title: string
  description?: string
  start: Date
  end: Date
  type: EventType
  color?: string
  location?: string
  googleEventId?: string
  userId: string
}

// ============= GOALS =============
export enum GoalArea {
  CAREER = 'career',
  FINANCE = 'finance',
  FITNESS = 'fitness',
  PERSONAL = 'personal',
  LOVE = 'love',
  BUSINESS = 'business',
}

export interface Milestone {
  id: string
  title: string
  completed: boolean
  deadline?: Date
}

export interface Step {
  id: string
  title: string
  completed: boolean
  order: number
}

export interface Goal {
  id: string
  title: string
  description?: string
  area: GoalArea
  steps: Step[]
  milestones: Milestone[]
  deadline?: Date
  progress: number
  userId: string
  createdAt: Date
  updatedAt: Date
}

// ============= HABITS =============
export interface HabitLog {
  date: Date
  completed: boolean
}

export interface Habit {
  id: string
  title: string
  description?: string
  icon?: string
  color?: string
  streak: number
  logs: HabitLog[]
  userId: string
  createdAt: Date
}

// ============= TASKS =============
export enum TaskPriority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export interface Task {
  id: string
  title: string
  description?: string
  priority: TaskPriority
  completed: boolean
  tags: string[]
  dueDate?: Date
  recurring?: {
    frequency: 'daily' | 'weekly' | 'monthly'
    interval: number
  }
  userId: string
  createdAt: Date
  updatedAt: Date
}

// ============= JOURNAL =============
export enum Mood {
  EXCELLENT = 'excellent',
  GOOD = 'good',
  OKAY = 'okay',
  BAD = 'bad',
  TERRIBLE = 'terrible',
}

export interface JournalEntry {
  id: string
  date: Date
  mood: Mood
  feeling: string
  learned: string
  gratitude: string
  reflection: string
  aiAnalysis?: {
    sentiment: number
    keywords: string[]
    suggestions: string[]
  }
  userId: string
  createdAt: Date
}

// ============= FINANCE =============
export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export interface Transaction {
  id: string
  type: TransactionType
  amount: number
  category: string
  description?: string
  date: Date
  userId: string
  createdAt: Date
}

export interface FinancialSummary {
  totalIncome: number
  totalExpenses: number
  balance: number
  monthlyExpenses: { [key: string]: number }
  categoryBreakdown: { [key: string]: number }
}

// ============= HEALTH & FITNESS =============
export interface WorkoutExercise {
  name: string
  sets: number
  reps: number
  weight?: number
  notes?: string
}

export interface Workout {
  id: string
  date: Date
  type: string
  exercises: WorkoutExercise[]
  duration: number
  notes?: string
  userId: string
}

export interface BodyMeasurement {
  id: string
  date: Date
  weight?: number
  bodyFat?: number
  measurements?: {
    chest?: number
    waist?: number
    hips?: number
    arms?: number
    thighs?: number
  }
  photos?: string[]
  userId: string
}

export interface Supplement {
  id: string
  name: string
  dosage: string
  time: string
  taken: boolean
  userId: string
}

// ============= RELATIONSHIP =============
export interface SpecialDate {
  id: string
  title: string
  date: Date
  recurring: boolean
  type: 'anniversary' | 'birthday' | 'custom'
  userId: string
}

export interface Activity {
  id: string
  title: string
  description?: string
  date?: Date
  completed: boolean
  rating?: number
  userId: string
}

export interface Moment {
  id: string
  title: string
  description: string
  date: Date
  photos?: string[]
  tags: string[]
  userId: string
  createdAt: Date
}

// ============= API RESPONSES =============
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}
