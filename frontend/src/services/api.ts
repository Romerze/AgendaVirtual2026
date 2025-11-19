import axios from 'axios'
import { useAuthStore } from '../store/authStore'
import {
  User,
  CalendarEvent,
  Goal,
  Habit,
  Task,
  JournalEntry,
  Transaction,
  Workout,
  BodyMeasurement,
  SpecialDate,
  Activity,
  Moment,
  ApiResponse,
} from '../types'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout()
    }
    return Promise.reject(error)
  }
)

// ============= AUTH =============
export const authService = {
  login: async (email: string, password: string) => {
    const { data } = await api.post<ApiResponse<{ user: User; token: string }>>('/auth/login', {
      email,
      password,
    })
    return data.data!
  },

  register: async (name: string, email: string, password: string) => {
    const { data } = await api.post<ApiResponse<{ user: User; token: string }>>('/auth/register', {
      name,
      email,
      password,
    })
    return data.data!
  },

  me: async () => {
    const { data } = await api.get<ApiResponse<User>>('/auth/me')
    return data.data!
  },
}

// ============= CALENDAR =============
export const calendarService = {
  getEvents: async (start?: Date, end?: Date) => {
    const { data } = await api.get<ApiResponse<CalendarEvent[]>>('/calendar/events', {
      params: { start, end },
    })
    return data.data!
  },

  createEvent: async (event: Partial<CalendarEvent>) => {
    const { data } = await api.post<ApiResponse<CalendarEvent>>('/calendar/events', event)
    return data.data!
  },

  updateEvent: async (id: string, event: Partial<CalendarEvent>) => {
    const { data } = await api.put<ApiResponse<CalendarEvent>>(`/calendar/events/${id}`, event)
    return data.data!
  },

  deleteEvent: async (id: string) => {
    const { data } = await api.delete<ApiResponse<void>>(`/calendar/events/${id}`)
    return data
  },

  syncGoogleCalendar: async () => {
    const { data } = await api.post<ApiResponse<void>>('/calendar/sync-google')
    return data
  },
}

// ============= GOALS =============
export const goalsService = {
  getGoals: async () => {
    const { data } = await api.get<ApiResponse<Goal[]>>('/goals')
    return data.data!
  },

  createGoal: async (goal: Partial<Goal>) => {
    const { data } = await api.post<ApiResponse<Goal>>('/goals', goal)
    return data.data!
  },

  updateGoal: async (id: string, goal: Partial<Goal>) => {
    const { data } = await api.put<ApiResponse<Goal>>(`/goals/${id}`, goal)
    return data.data!
  },

  deleteGoal: async (id: string) => {
    const { data } = await api.delete<ApiResponse<void>>(`/goals/${id}`)
    return data
  },
}

// ============= HABITS =============
export const habitsService = {
  getHabits: async () => {
    const { data } = await api.get<ApiResponse<Habit[]>>('/habits')
    return data.data!
  },

  createHabit: async (habit: Partial<Habit>) => {
    const { data } = await api.post<ApiResponse<Habit>>('/habits', habit)
    return data.data!
  },

  updateHabit: async (id: string, habit: Partial<Habit>) => {
    const { data } = await api.put<ApiResponse<Habit>>(`/habits/${id}`, habit)
    return data.data!
  },

  deleteHabit: async (id: string) => {
    const { data } = await api.delete<ApiResponse<void>>(`/habits/${id}`)
    return data
  },

  logHabit: async (id: string, date: Date, completed: boolean) => {
    const { data } = await api.post<ApiResponse<Habit>>(`/habits/${id}/log`, { date, completed })
    return data.data!
  },
}

// ============= TASKS =============
export const tasksService = {
  getTasks: async () => {
    const { data } = await api.get<ApiResponse<Task[]>>('/tasks')
    return data.data!
  },

  createTask: async (task: Partial<Task>) => {
    const { data } = await api.post<ApiResponse<Task>>('/tasks', task)
    return data.data!
  },

  updateTask: async (id: string, task: Partial<Task>) => {
    const { data } = await api.put<ApiResponse<Task>>(`/tasks/${id}`, task)
    return data.data!
  },

  deleteTask: async (id: string) => {
    const { data } = await api.delete<ApiResponse<void>>(`/tasks/${id}`)
    return data
  },
}

// ============= JOURNAL =============
export const journalService = {
  getEntries: async () => {
    const { data } = await api.get<ApiResponse<JournalEntry[]>>('/journal')
    return data.data!
  },

  createEntry: async (entry: Partial<JournalEntry>) => {
    const { data } = await api.post<ApiResponse<JournalEntry>>('/journal', entry)
    return data.data!
  },

  updateEntry: async (id: string, entry: Partial<JournalEntry>) => {
    const { data } = await api.put<ApiResponse<JournalEntry>>(`/journal/${id}`, entry)
    return data.data!
  },

  deleteEntry: async (id: string) => {
    const { data } = await api.delete<ApiResponse<void>>(`/journal/${id}`)
    return data
  },
}

// ============= FINANCE =============
export const financeService = {
  getTransactions: async () => {
    const { data } = await api.get<ApiResponse<Transaction[]>>('/finance/transactions')
    return data.data!
  },

  createTransaction: async (transaction: Partial<Transaction>) => {
    const { data } = await api.post<ApiResponse<Transaction>>('/finance/transactions', transaction)
    return data.data!
  },

  deleteTransaction: async (id: string) => {
    const { data } = await api.delete<ApiResponse<void>>(`/finance/transactions/${id}`)
    return data
  },

  getSummary: async (month?: number, year?: number) => {
    const { data } = await api.get('/finance/summary', {
      params: { month, year },
    })
    return data.data!
  },
}

// ============= HEALTH =============
export const healthService = {
  getWorkouts: async () => {
    const { data } = await api.get<ApiResponse<Workout[]>>('/health/workouts')
    return data.data!
  },

  createWorkout: async (workout: Partial<Workout>) => {
    const { data } = await api.post<ApiResponse<Workout>>('/health/workouts', workout)
    return data.data!
  },

  getMeasurements: async () => {
    const { data } = await api.get<ApiResponse<BodyMeasurement[]>>('/health/measurements')
    return data.data!
  },

  createMeasurement: async (measurement: Partial<BodyMeasurement>) => {
    const { data } = await api.post<ApiResponse<BodyMeasurement>>('/health/measurements', measurement)
    return data.data!
  },
}

// ============= RELATIONSHIP =============
export const relationshipService = {
  getSpecialDates: async () => {
    const { data } = await api.get<ApiResponse<SpecialDate[]>>('/relationship/special-dates')
    return data.data!
  },

  createSpecialDate: async (date: Partial<SpecialDate>) => {
    const { data } = await api.post<ApiResponse<SpecialDate>>('/relationship/special-dates', date)
    return data.data!
  },

  getActivities: async () => {
    const { data } = await api.get<ApiResponse<Activity[]>>('/relationship/activities')
    return data.data!
  },

  createActivity: async (activity: Partial<Activity>) => {
    const { data } = await api.post<ApiResponse<Activity>>('/relationship/activities', activity)
    return data.data!
  },

  getMoments: async () => {
    const { data } = await api.get<ApiResponse<Moment[]>>('/relationship/moments')
    return data.data!
  },

  createMoment: async (moment: Partial<Moment>) => {
    const { data } = await api.post<ApiResponse<Moment>>('/relationship/moments', moment)
    return data.data!
  },
}

export default api
