import { type BoardTask, type TaskStatus, type TaskColumns, type TaskFormData } from '../types'
import { useLocalStorage } from './useLocalStorage'

const LS_KEY = 'tolist.board.v1'

const DEFAULT_COLUMNS: TaskColumns = {
  todo: [{ id: '1', title: 'Diseñar logo' }],
  doing: [{ id: '2', title: 'Formulario de tareas', description: 'Título y descripción' }],
  done: [{ id: '3', title: 'Terminar de configurar todo' }],
}

export function useTasks(onTaskMove?: (taskTitle: string, from: TaskStatus, to: TaskStatus) => void) {
  const [columns, setColumns] = useLocalStorage<TaskColumns>(LS_KEY, DEFAULT_COLUMNS)

  const generateId = () => Math.random().toString(36).slice(2, 8) + '-' + Date.now().toString(36)

  const moveTask = (taskId: string, from: TaskStatus, to: TaskStatus) => {
    setColumns((prev) => {
      if (from === to) return prev
      
      const source = [...prev[from]]
      const taskIndex = source.findIndex((t) => t.id === taskId)
      
      if (taskIndex < 0) return prev
      
      const [task] = source.splice(taskIndex, 1)
      const destination = [...prev[to], task]
      
      if (onTaskMove) {
        onTaskMove(task.title, from, to)
      }
      
      return { ...prev, [from]: source, [to]: destination }
    })
  }

  const createTask = (formData: TaskFormData) => {
    const cleanTitle = formData.title.trim()
    const cleanDescription = formData.description.trim()
    
    if (!cleanTitle) return false

    const newTask: BoardTask = {
      id: generateId(),
      title: cleanTitle,
      ...(cleanDescription ? { description: cleanDescription } : {}),
    }

    setColumns((prev) => ({ ...prev, todo: [newTask, ...prev.todo] }))
    return true
  }

  const updateTask = (taskId: string, formData: TaskFormData) => {
    const cleanTitle = formData.title.trim()
    const cleanDescription = formData.description.trim()
    
    if (!cleanTitle) return false

    setColumns((prev) => {
      const statuses: TaskStatus[] = ['todo', 'doing', 'done']
      
      for (const status of statuses) {
        const taskExists = prev[status].some((t) => t.id === taskId)
        
        if (taskExists) {
          const updatedList = prev[status].map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  title: cleanTitle,
                  ...(cleanDescription ? { description: cleanDescription } : { description: undefined }),
                }
              : task,
          )
          return { ...prev, [status]: updatedList }
        }
      }
      
      return prev
    })
    return true
  }

  const deleteTask = (taskId: string) => {
    setColumns((prev) => {
      const statuses: TaskStatus[] = ['todo', 'doing', 'done']
      
      for (const status of statuses) {
        const taskIndex = prev[status].findIndex((t) => t.id === taskId)
        
        if (taskIndex !== -1) {
          const updatedList = [...prev[status]]
          updatedList.splice(taskIndex, 1)
          return { ...prev, [status]: updatedList }
        }
      }
      
      return prev
    })
  }

  const findTask = (taskId: string): { task: BoardTask; status: TaskStatus } | null => {
    const statuses: TaskStatus[] = ['todo', 'doing', 'done']
    
    for (const status of statuses) {
      const task = columns[status].find((t) => t.id === taskId)
      if (task) {
        return { task, status }
      }
    }
    
    return null
  }

  return {
    columns,
    moveTask,
    createTask,
    updateTask,
    deleteTask,
    findTask,
  }
}
