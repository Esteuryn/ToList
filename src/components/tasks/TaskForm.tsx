import { type FormEvent } from 'react'
import { Button, Input, Textarea } from '../ui'
import { type TaskFormData } from '../../types'

interface TaskFormProps {
  data: TaskFormData
  onDataChange: (data: TaskFormData) => void
  onSubmit: (e: FormEvent) => void
  onCancel: () => void
  submitLabel: string
  showDelete?: boolean
  onDelete?: () => void
}

export default function TaskForm({
  data,
  onDataChange,
  onSubmit,
  onCancel,
  submitLabel,
  showDelete = false,
  onDelete,
}: TaskFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Input
        id="title"
        name="title"
        label="Título"
        value={data.title}
        onChange={(e) => onDataChange({ ...data, title: e.target.value })}
        required
        autoFocus
        placeholder="p.ej. Diseñar logo"
      />
      
      <Textarea
        id="description"
        name="description"
        label="Descripción"
        value={data.description}
        onChange={(e) => onDataChange({ ...data, description: e.target.value })}
        rows={4}
        placeholder="Detalles opcionales…"
      />
      
      <div className="flex items-center justify-end gap-2">
        {showDelete && onDelete && (
          <Button
            type="button"
            onClick={onDelete}
            variant="danger"
            className="mr-auto"
          >
            Eliminar
          </Button>
        )}
        
        <Button
          type="button"
          onClick={onCancel}
          variant="secondary"
        >
          Cancelar
        </Button>
        
        <Button type="submit" variant="primary">
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
