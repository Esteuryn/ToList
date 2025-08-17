import { type FormEvent } from 'react'
import './styles/index.css'
import AppShell from './layout/AppShell'
import { TaskBoard, CreateTaskModal, EditTaskModal } from './components/tasks'
import { ToastContainer } from './components/ui'
import { useTasks, useTaskModals, useToast, ThemeContext, useThemeProvider, ToastContext } from './hooks'

export default function App() {
  const themeProvider = useThemeProvider()
  const { toasts, removeToast, toast } = useToast()
  const handleTaskMove = (taskTitle: string, from: string, to: string) => {
    const statusNames = {
      todo: 'Por hacer',
      doing: 'En curso', 
      done: 'Completadas'
    }
    toast.success(`"${taskTitle}" movida de ${statusNames[from as keyof typeof statusNames]} a ${statusNames[to as keyof typeof statusNames]}`)
  }

  const { columns, moveTask, createTask, updateTask, deleteTask } = useTasks(handleTaskMove)
  const {
    createModalOpen,
    createFormData,
    setCreateFormData,
    openCreateModal,
    closeCreateModal,
    editModalOpen,
    editingTaskId,
    editFormData,
    setEditFormData,
    openEditModal,
    closeEditModal,
  } = useTaskModals()

  const handleCreateTask = (e: FormEvent) => {
    e.preventDefault()
    const success = createTask(createFormData)
    if (success) {
      toast.success(`Tarea "${createFormData.title}" creada exitosamente`)
      closeCreateModal()
    }
  }

  const handleUpdateTask = (e: FormEvent) => {
    e.preventDefault()
    if (!editingTaskId) return
    
    const success = updateTask(editingTaskId, editFormData)
    if (success) {
      toast.success(`Tarea "${editFormData.title}" actualizada exitosamente`)
      closeEditModal()
    }
  }

  const handleDeleteTask = () => {
    if (!editingTaskId) return
    
    const confirmed = window.confirm('¿Eliminar esta tarea? Esta acción no se puede deshacer.')
    if (!confirmed) return
    
    const taskTitle = editFormData.title
    deleteTask(editingTaskId)
    toast.success(`Tarea "${taskTitle}" eliminada exitosamente`)
    closeEditModal()
  }

  return (
    <ThemeContext.Provider value={themeProvider}>
      <ToastContext.Provider value={{ toast }}>
        <AppShell onAddTaskClick={openCreateModal}>
          <TaskBoard
            columns={columns}
            onMove={moveTask}
            onTaskClick={openEditModal}
          />
        </AppShell>

        <CreateTaskModal
          open={createModalOpen}
          onClose={closeCreateModal}
          formData={createFormData}
          onFormDataChange={setCreateFormData}
          onSubmit={handleCreateTask}
        />

        <EditTaskModal
          open={editModalOpen}
          onClose={closeEditModal}
          formData={editFormData}
          onFormDataChange={setEditFormData}
          onSubmit={handleUpdateTask}
          onDelete={handleDeleteTask}
        />

        <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
      </ToastContext.Provider>
    </ThemeContext.Provider>
  )
}