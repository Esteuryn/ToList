import React, { useMemo, useRef, useState } from 'react'

export type TaskStatus = 'todo' | 'doing' | 'done'

export interface BoardTask {
  id: string
  title: string
  description?: string
  dueAt?: string // ISO
  priority?: 'baja' | 'media' | 'alta'
}

type Columns = Partial<Record<TaskStatus, BoardTask[]>>

export function BoardCanvas({
  columns,
  onMove,   // <- se invoca al soltar una tarjeta en otra columna
  onOpen,   // <- abrir detalle/editar
}: {
  columns?: Columns
  onMove: (taskId: string, from: TaskStatus, to: TaskStatus) => void
  onOpen?: (t: BoardTask) => void
}) {
  const data = useMemo<Record<TaskStatus, BoardTask[]>>(
    () => ({
      todo: columns?.todo ?? [],
      doing: columns?.doing ?? [],
      done: columns?.done ?? [],
    }),
    [columns],
  )

  // estado visual de "drag over" por columna
  const [over, setOver] = useState<Partial<Record<TaskStatus, boolean>>>({})
  const dragFrom = useRef<TaskStatus | null>(null)

  return (
    <div className="overflow-x-auto pb-4">
      {/* scroll horizontal en mobile con snap */}
      <div className="flex min-h-[60vh] gap-4 snap-x snap-mandatory">
        <Column
          title="Por hacer"
          status="todo"
          tasks={data.todo}
          over={!!over.todo}
          onDragEnter={() => setOver((s) => ({ ...s, todo: true }))}
          onDragLeave={() => setOver((s) => ({ ...s, todo: false }))}
          onDrop={(payload) => {
            setOver((s) => ({ ...s, todo: false }))
            if (payload.from !== 'todo') onMove(payload.id, payload.from, 'todo')
          }}
          onOpen={onOpen}
          setDragFrom={(s) => (dragFrom.current = s)}
        />
        <Column
          title="En curso"
          status="doing"
          tasks={data.doing}
          over={!!over.doing}
          onDragEnter={() => setOver((s) => ({ ...s, doing: true }))}
          onDragLeave={() => setOver((s) => ({ ...s, doing: false }))}
          onDrop={(payload) => {
            setOver((s) => ({ ...s, doing: false }))
            if (payload.from !== 'doing') onMove(payload.id, payload.from, 'doing')
          }}
          onOpen={onOpen}
          setDragFrom={(s) => (dragFrom.current = s)}
        />
        <Column
          title="Completadas"
          status="done"
          tasks={data.done}
          over={!!over.done}
          onDragEnter={() => setOver((s) => ({ ...s, done: true }))}
          onDragLeave={() => setOver((s) => ({ ...s, done: false }))}
          onDrop={(payload) => {
            setOver((s) => ({ ...s, done: false }))
            if (payload.from !== 'done') onMove(payload.id, payload.from, 'done')
          }}
          onOpen={onOpen}
          setDragFrom={(s) => (dragFrom.current = s)}
        />
      </div>
    </div>
  )
}

function Column({
  title,
  status,
  tasks,
  over,
  onDragEnter,
  onDragLeave,
  onDrop,
  onOpen,
  setDragFrom,
}: {
  title: string
  status: TaskStatus
  tasks: BoardTask[]
  over: boolean
  onDragEnter: () => void
  onDragLeave: () => void
  onDrop: (payload: { id: string; from: TaskStatus }) => void
  onOpen?: (t: BoardTask) => void
  setDragFrom: (s: TaskStatus) => void
}) {
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
          const payload = JSON.parse(text) as { id: string; from: TaskStatus }
          onDrop(payload)
        } catch {}
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
        {/* sin botón aquí por tu requerimiento */}
      </header>

      <div
        className={
          'space-y-2 rounded-md p-1 transition ' +
          (over ? 'ring-2 ring-indigo-500 ring-offset-0' : '')
        }
      >
        {tasks.length === 0 && (
          <div className="rounded-lg border border-dashed border-black/10 p-4 text-center text-xs text-gray-500 dark:border-white/10 dark:text-gray-400">
            Sin tareas aún
          </div>
        )}
        {tasks.map((t) => (
          <TaskCard key={t.id} t={t} status={status} setDragFrom={setDragFrom} onOpen={onOpen} />
        ))}
      </div>
    </section>
  )
}

function TaskCard({
  t,
  status,
  setDragFrom,
  onOpen,
}: {
  t: BoardTask
  status: TaskStatus
  setDragFrom: (s: TaskStatus) => void
  onOpen?: (t: BoardTask) => void
}) {
  return (
    <button
      draggable
      onDragStart={(e) => {
        setDragFrom(status)
        e.dataTransfer.setData('text/plain', JSON.stringify({ id: t.id, from: status }))
        e.dataTransfer.effectAllowed = 'move'
      }}
      className="w-full rounded-xl border border-black/10 bg-white p-3 text-left shadow-sm transition
                 hover:shadow dark:border-white/10 dark:bg-white/5"
      onClick={() => onOpen?.(t)}
      role="listitem"
    >
      <div className="text-sm font-medium">{t.title}</div>
      {t.description && (
        <p className="mt-1 line-clamp-2 text-xs text-gray-500 dark:text-gray-400">{t.description}</p>
      )}
      <div className="mt-2 flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400">
        {t.priority && <span className="rounded-full border border-black/10 px-2 py-0.5 dark:border-white/10">{t.priority}</span>}
        {t.dueAt && <time dateTime={t.dueAt}>{new Date(t.dueAt).toLocaleDateString()}</time>}
      </div>
    </button>
  )
}
