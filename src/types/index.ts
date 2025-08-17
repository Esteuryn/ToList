export type TaskStatus = 'todo' | 'doing' | 'done'

export interface BoardTask {
  id: string
  title: string
  description?: string
}

export type TaskColumns = Record<TaskStatus, BoardTask[]>

export interface TaskFormData {
  title: string
  description: string
}

export interface DragPayload {
  id: string
  from: TaskStatus
}
