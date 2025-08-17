
import { render, screen } from '@testing-library/react'
import { fireEvent } from '@testing-library/dom'
import TaskBoard from '../src/components/tasks/TaskBoard'
import { type BoardTask } from '../src/types'

function createDataTransfer() {
  const data: Record<string, string> = {}
  return {
    setData: (type: string, val: string) => {
      data[type] = val
    },
    getData: (type: string) => data[type] ?? '',
    clearData: () => {
      for (const k of Object.keys(data)) delete data[k]
    },
    dropEffect: 'move',
    effectAllowed: 'all',
    files: [],
    items: [],
    types: [],
  } as unknown as DataTransfer
}

describe('TaskBoard', () => {
  it('renders columns and counts', () => {
    const tasks: Record<'todo' | 'doing' | 'done', BoardTask[]> = {
      todo: [{ id: '1', title: 'A' }],
      doing: [{ id: '2', title: 'B' }, { id: '3', title: 'C' }],
      done: [],
    }

    render(
      <TaskBoard
        columns={tasks}
        onMove={() => {}}
        onTaskClick={() => {}}
      />,
    )

    expect(screen.getByRole('region', { name: 'Por hacer' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'En curso' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Completadas' })).toBeInTheDocument()

    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.getByText('B')).toBeInTheDocument()
    expect(screen.getByText('C')).toBeInTheDocument()
  })

  it('invokes onMove when dragging a task to another column', () => {
    const onMove = vi.fn()
    const tasks: Record<'todo' | 'doing' | 'done', BoardTask[]> = {
      todo: [{ id: '1', title: 'Move me' }],
      doing: [],
      done: [],
    }

    render(
      <TaskBoard
        columns={tasks}
        onMove={onMove}
        onTaskClick={() => {}}
      />,
    )

    const task = screen.getByText('Move me').closest('button') as HTMLElement
    const target = screen.getByRole('region', { name: 'En curso' })

    const dataTransfer = createDataTransfer()
    fireEvent.dragStart(task, { dataTransfer })
    fireEvent.dragEnter(target, { dataTransfer })
    fireEvent.dragOver(target, { dataTransfer })
    fireEvent.drop(target, { dataTransfer })

    expect(onMove).toHaveBeenCalledWith('1', 'todo', 'doing')
  })
})


