import { type FormEvent } from 'react'
import { Modal } from '../ui'
import { type TaskFormData } from '../../types'
import TaskForm from './TaskForm'

interface CreateTaskModalProps {
  open: boolean
  onClose: () => void
  formData: TaskFormData
  onFormDataChange: (data: TaskFormData) => void
  onSubmit: (e: FormEvent) => void
}

export default function CreateTaskModal({
  open,
  onClose,
  formData,
  onFormDataChange,
  onSubmit,
}: CreateTaskModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Nueva tarea"
      description=''
    >
      <TaskForm
        data={formData}
        onDataChange={onFormDataChange}
        onSubmit={onSubmit}
        onCancel={onClose}
        submitLabel="Crear tarea"
      />
    </Modal>
  )
}
