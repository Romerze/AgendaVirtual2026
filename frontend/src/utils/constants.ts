import { EventType, GoalArea, TaskPriority, Mood, TransactionType } from '../types'

export const EVENT_TYPE_COLORS: Record<EventType, string> = {
  [EventType.GYM]: '#FF6B6B',
  [EventType.WORK]: '#4ECDC4',
  [EventType.APPOINTMENT]: '#45B7D1',
  [EventType.FAMILY]: '#FFA07A',
  [EventType.LOVE]: '#FF1744',
  [EventType.STUDY]: '#7B68EE',
}

export const GOAL_AREA_LABELS: Record<GoalArea, string> = {
  [GoalArea.CAREER]: 'Carrera',
  [GoalArea.FINANCE]: 'Finanzas',
  [GoalArea.FITNESS]: 'Fitness',
  [GoalArea.PERSONAL]: 'Personal',
  [GoalArea.LOVE]: 'Amor',
  [GoalArea.BUSINESS]: 'Negocios',
}

export const GOAL_AREA_ICONS: Record<GoalArea, string> = {
  [GoalArea.CAREER]: '💼',
  [GoalArea.FINANCE]: '💰',
  [GoalArea.FITNESS]: '💪',
  [GoalArea.PERSONAL]: '🎯',
  [GoalArea.LOVE]: '❤️',
  [GoalArea.BUSINESS]: '🚀',
}

export const TASK_PRIORITY_COLORS: Record<TaskPriority, string> = {
  [TaskPriority.HIGH]: 'text-red-600 bg-red-50',
  [TaskPriority.MEDIUM]: 'text-yellow-600 bg-yellow-50',
  [TaskPriority.LOW]: 'text-green-600 bg-green-50',
}

export const MOOD_EMOJIS: Record<Mood, string> = {
  [Mood.EXCELLENT]: '😄',
  [Mood.GOOD]: '😊',
  [Mood.OKAY]: '😐',
  [Mood.BAD]: '😞',
  [Mood.TERRIBLE]: '😢',
}

export const MOOD_COLORS: Record<Mood, string> = {
  [Mood.EXCELLENT]: '#10B981',
  [Mood.GOOD]: '#3B82F6',
  [Mood.OKAY]: '#F59E0B',
  [Mood.BAD]: '#EF4444',
  [Mood.TERRIBLE]: '#991B1B',
}

export const EXPENSE_CATEGORIES = [
  'Alimentación',
  'Transporte',
  'Salud',
  'Entretenimiento',
  'Educación',
  'Vivienda',
  'Servicios',
  'Ropa',
  'Gym',
  'Otros',
]

export const INCOME_CATEGORIES = [
  'Salario',
  'Freelance',
  'Negocios',
  'Inversiones',
  'Otros',
]
