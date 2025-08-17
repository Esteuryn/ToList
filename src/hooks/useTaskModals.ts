import { useState } from 'react'
import { type BoardTask, type TaskFormData } from '../types'

const INITIAL_FORM_DATA: TaskFormData = {
  title: '',
  description: '',
}

export function useTaskModals() {

  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [createFormData, setCreateFormData] = useState<TaskFormData>(INITIAL_FORM_DATA)

  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)
  const [editFormData, setEditFormData] = useState<TaskFormData>(INITIAL_FORM_DATA)

  const openCreateModal = () => {
    setCreateModalOpen(true)
  }

  const closeCreateModal = () => {
    setCreateModalOpen(false)
    setCreateFormData(INITIAL_FORM_DATA)
  }

  const openEditModal = (task: BoardTask) => {
    setEditingTaskId(task.id)
    setEditFormData({
      title: task.title,
      description: task.description ?? '',
    })
    setEditModalOpen(true)
  }

  const closeEditModal = () => {
    setEditModalOpen(false)
    setEditingTaskId(null)
    setEditFormData(INITIAL_FORM_DATA)
  }

  return {
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
  }
}
