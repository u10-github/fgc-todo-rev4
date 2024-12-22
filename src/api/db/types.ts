export interface User {
  id: string
  name: string | null
  email: string | null
  emailVerified: Date | null
  image: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Task {
  id: string
  title: string
  description: string | null
  dueDate: Date | null
  completed: boolean
  priority: number
  userId: string
  taskListId: string | null
  createdAt: Date
  updatedAt: Date
}

export interface TaskList {
  id: string
  title: string
  description: string | null
  userId: string
  createdAt: Date
  updatedAt: Date
} 