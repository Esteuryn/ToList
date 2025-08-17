import { type BoardTask, type TaskStatus } from '../../types'

interface TaskCardProps {
  task: BoardTask
  status: TaskStatus
  onClick: (task: BoardTask) => void
}

export default function TaskCard({ task, status, onClick }: TaskCardProps) {
  return (
    <button
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', JSON.stringify({ id: task.id, from: status }))
        e.dataTransfer.effectAllowed = 'move'
      }}
      className="w-full rounded-xl border border-black/10 bg-white p-3 text-left shadow-sm transition
                 hover:shadow dark:border-white/10 dark:bg-white/5"
      onClick={() => onClick(task)}
      role="listitem"
    >
      <div className="text-sm font-medium">{task.title}</div>
      {task.description && (
        <p className="mt-1 line-clamp-2 text-xs text-gray-500 dark:text-gray-400">
          {task.description}
        </p>
      )}
    </button>
  )
}
