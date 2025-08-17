import { useMemo, useState } from 'react'
import { type BoardTask, type TaskStatus, type TaskColumns, type DragPayload } from '../../types'
import TaskColumn from './TaskColumn'

interface TaskBoardProps {
  columns?: Partial<TaskColumns>
  onMove: (taskId: string, from: TaskStatus, to: TaskStatus) => void
  onTaskClick: (task: BoardTask) => void
}

const COLUMN_CONFIG = [
  { status: 'todo' as TaskStatus, title: 'Por hacer' },
  { status: 'doing' as TaskStatus, title: 'En curso' },
  { status: 'done' as TaskStatus, title: 'Completadas' },
]

export default function TaskBoard({ columns, onMove, onTaskClick }: TaskBoardProps) {
  const data = useMemo<TaskColumns>(
    () => ({
      todo: columns?.todo ?? [],
      doing: columns?.doing ?? [],
      done: columns?.done ?? [],
    }),
    [columns],
  )

  const [dragOverStates, setDragOverStates] = useState<Partial<Record<TaskStatus, boolean>>>({})

  const handleDragEnter = (status: TaskStatus) => {
    setDragOverStates((prev) => ({ ...prev, [status]: true }))
  }

  const handleDragLeave = (status: TaskStatus) => {
    setDragOverStates((prev) => ({ ...prev, [status]: false }))
  }

  const handleDrop = (status: TaskStatus, payload: DragPayload) => {
    setDragOverStates((prev) => ({ ...prev, [status]: false }))
    if (payload.from !== status) {
      onMove(payload.id, payload.from, status)
    }
  }



  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex min-h-[60vh] gap-4 snap-x snap-mandatory justify-center">
        {COLUMN_CONFIG.map(({ status, title }) => (
          <TaskColumn
            key={status}
            title={title}
            status={status}
            tasks={data[status]}
            isOver={!!dragOverStates[status]}
            onDragEnter={() => handleDragEnter(status)}
            onDragLeave={() => handleDragLeave(status)}
            onDrop={(payload) => handleDrop(status, payload)}
            onTaskClick={onTaskClick}

          />
        ))}
      </div>
    </div>
  )
}
