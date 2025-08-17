import { type BoardTask, type TaskStatus, type DragPayload } from '../../types'
import TaskCard from './TaskCard'

interface TaskColumnProps {
  title: string
  status: TaskStatus
  tasks: BoardTask[]
  isOver: boolean
  onDragEnter: () => void
  onDragLeave: () => void
  onDrop: (payload: DragPayload) => void
  onTaskClick: (task: BoardTask) => void

}

export default function TaskColumn({
  title,
  status,
  tasks,
  isOver,
  onDragEnter,
  onDragLeave,
  onDrop,
  onTaskClick,

}: TaskColumnProps) {
  return (
    <section
      className="flex-none w-[20rem] sm:w-80 snap-start rounded-2xl border border-black/10 bg-white/60 p-3 backdrop-blur
                 dark:border-white/10 dark:bg-white/5 transition-shadow"
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={(e) => {
        e.preventDefault()
        try {
          const text = e.dataTransfer.getData('text/plain')
          const payload = JSON.parse(text) as DragPayload
          onDrop(payload)
        } catch (err) {
          console.error('Failed to parse drag payload:', err)
        }
      }}
      aria-label={title}
      role="region"
    >
      <header className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold">{title}</h3>
          <span className="rounded-full bg-black/10 px-2 py-0.5 text-xs font-medium dark:bg-white/10">
            {tasks.length}
          </span>
        </div>
      </header>

      <div
        className={
          'space-y-2 rounded-md p-1 transition ' +
          (isOver ? 'ring-2 ring-indigo-500 ring-offset-0' : '')
        }
      >
        {tasks.length === 0 && (
          <div className="rounded-lg border border-dashed border-black/10 p-4 text-center text-xs text-gray-500 dark:border-white/10 dark:text-gray-400">
            Sin tareas aún
          </div>
        )}
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            status={status}

            onClick={onTaskClick}
          />
        ))}
      </div>
    </section>
  )
}
