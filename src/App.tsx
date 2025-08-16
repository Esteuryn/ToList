import React, { useEffect, useState } from 'react'
import './styles/index.css'
import AppShell from './layout/AppShell'
import { BoardCanvas, type BoardTask, type TaskStatus } from './features/tasks/BoardCanvas'

type Cols = Record<TaskStatus, BoardTask[]>
const LS_KEY = 'tolist.board.v1'

function load(): Cols {
  const raw = localStorage.getItem(LS_KEY)
  if (raw) return JSON.parse(raw)
  // demo inicial
  return {
    todo:  [{ id:'1', title:'Diseñar logo', priority:'media' }],
    doing: [{ id:'2', title:'Formulario de tareas', description:'Título, descripción, fecha' }],
    done:  [{ id:'3', title:'Terminar de configurar todo', dueAt:new Date().toISOString() }],
  }
}

export default function App() {
  const [cols, setCols] = useState<Cols>(() => load())

  // persistencia
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(cols))
  }, [cols])

  // mover tarjetas entre columnas
  const handleMove = (taskId: string, from: TaskStatus, to: TaskStatus) => {
    setCols((prev) => {
      if (from === to) return prev
      const source = [...prev[from]]
      const idx = source.findIndex((t) => t.id === taskId)
      if (idx < 0) return prev
      const [task] = source.splice(idx, 1)
      const dest = [...prev[to], task] // al final; luego podemos permitir orden
      return { ...prev, [from]: source, [to]: dest }
    })
  }

  return (
    <AppShell onAddTaskClick={() => console.log('Nueva tarea (abrir modal)')}>
      <BoardCanvas columns={cols} onMove={handleMove} onOpen={(t) => console.log('Abrir', t)} />
    </AppShell>
  )
}