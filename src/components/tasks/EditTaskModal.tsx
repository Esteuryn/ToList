import { type FormEvent } from 'react'
import { Modal } from '../ui'
import { type TaskFormData } from '../../types'
import TaskForm from './TaskForm'

interface EditTaskModalProps {
  open: boolean
  onClose: () => void
  formData: TaskFormData
  onFormDataChange: (data: TaskFormData) => void
  onSubmit: (e: FormEvent) => void
  onDelete: () => void
}

export default function EditTaskModal({
  open,
  onClose,
  formData,
  onFormDataChange,
  onSubmit,
  onDelete,
}: EditTaskModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Editar tarea"
      description="Modifica los campos de la tarea"
    >
      <TaskForm
        data={formData}
        onDataChange={onFormDataChange}
        onSubmit={onSubmit}
        onCancel={onClose}
        submitLabel="Guardar cambios"
        showDelete
        onDelete={onDelete}
      />
    </Modal>
  )
}
