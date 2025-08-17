import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../src/App'

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

describe('App main flows', () => {
  beforeEach(() => {
    localStorage.removeItem('tolist.board.v1')
    vi.restoreAllMocks()
  })

  it('shows initial columns and seeded tasks', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'ToList' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Por hacer' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'En curso' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Completadas' })).toBeInTheDocument()

    expect(screen.getByText('Diseñar logo')).toBeInTheDocument()
    expect(screen.getByText('Formulario de tareas')).toBeInTheDocument()
    expect(screen.getByText('Terminar de configurar todo')).toBeInTheDocument()
  })

  it('creates a new task into Por hacer and persists to localStorage', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Nueva tarea' }))

    const titleInput = screen.getByLabelText('Título')
    await user.type(titleInput, 'Escribir documentación')

    const descInput = screen.getByLabelText('Descripción')
    await user.type(descInput, 'Agregar README y guías')

    await user.click(screen.getByRole('button', { name: 'Crear tarea' }))

    await waitFor(() => expect(screen.getByText('Escribir documentación')).toBeInTheDocument())

    const raw = localStorage.getItem('tolist.board.v1')
    expect(raw).toBeTruthy()
    const parsed = JSON.parse(String(raw)) as { todo: Array<{ title: string }> }
    expect(parsed.todo.some((t) => t.title === 'Escribir documentación')).toBe(true)
  })

  it('edits an existing task', async () => {
    const user = userEvent.setup()
    render(<App />)

    const openBtn1 = screen.getByText('Diseñar logo').closest('button') as HTMLElement
    await user.click(openBtn1)

    const title = screen.getByLabelText('Título')
    await user.clear(title)
    await user.type(title, 'Diseñar logo v2')

    const desc = screen.getByLabelText('Descripción')
    await user.clear(desc)
    await user.type(desc, 'Usar nuevos colores')

    await user.click(screen.getByRole('button', { name: 'Guardar cambios' }))

    await waitFor(() => expect(screen.getByText('Diseñar logo v2')).toBeInTheDocument())
  })

  it('deletes a task via the edit dialog', async () => {
    const user = userEvent.setup()
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    render(<App />)

    const openBtn = screen.getByText('Diseñar logo').closest('button') as HTMLElement
    await user.click(openBtn)
    await user.click(screen.getByRole('button', { name: 'Eliminar' }))

    await waitFor(() => expect(screen.queryByText('Diseñar logo')).not.toBeInTheDocument())
  })

  it('moves a task across columns via drag and drop', async () => {
    render(<App />)

    const task = screen.getByText('Diseñar logo').closest('button') as HTMLElement
    const target = screen.getByRole('region', { name: 'En curso' })

    const dataTransfer = createDataTransfer()

    fireEvent.dragStart(task, { dataTransfer })
    fireEvent.dragEnter(target, { dataTransfer })
    fireEvent.dragOver(target, { dataTransfer })
    fireEvent.drop(target, { dataTransfer })

    await waitFor(() => expect(screen.getByRole('region', { name: 'En curso' })).toContainElement(screen.getByText('Diseñar logo')))
  })
})


