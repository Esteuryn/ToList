'use client'

import React, { useState, type PropsWithChildren } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react'
import {
  Bars3Icon,
  CalendarIcon,
  CheckCircleIcon,
  Cog6ToothIcon,
  ListBulletIcon,
  TrashIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
} from '@heroicons/react/24/outline'

/** ---------- Tipos ---------- */
type NavItem = {
  name: string
  href: string
  icon: React.ElementType
  current?: boolean
}

/** ---------- Utils ---------- */
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

/** ---------- Brand ---------- */
function Logo({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <div className={cn('flex items-center gap-2', collapsed && 'justify-center')}>
      <span className="inline-flex size-8 items-center justify-center rounded-xl bg-indigo-600 text-white shadow">
        <CheckCircleIcon className="size-5" />
      </span>
      {!collapsed && <span className="text-lg font-semibold tracking-tight">ToList</span>}
    </div>
  )
}

/** ---------- Navegación (en español) ---------- */
const navigation: NavItem[] = [
  { name: 'Tareas', href: '#tasks', icon: ListBulletIcon, current: true },
  { name: 'Calendario', href: '#calendar', icon: CalendarIcon },
  { name: 'Papelera', href: '#trash', icon: TrashIcon },
  { name: 'Ajustes', href: '#settings', icon: Cog6ToothIcon },
]

/** ---------- Fondo degradado ---------- */
function GradientBG() {
  return (
    <>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[38rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[38rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </>
  )
}

/** ---------- AppShell ---------- */
type AppShellProps = PropsWithChildren<{ onAddTaskClick?: () => void }>

export default function AppShell({ children, onAddTaskClick }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false) // móvil
  const [collapsed, setCollapsed] = useState(false) // desktop: contraer/expandir

  return (
    <div className="relative isolate min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <GradientBG />

      {/* Sidebar móvil con animación */}
      <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
        <DialogBackdrop className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-out data-closed:opacity-0" />
        <div className="fixed inset-0 flex">
          <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-out data-closed:-translate-x-full">
            <TransitionChild>
              <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-out data-closed:opacity-0">
                <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                  <span className="sr-only">Cerrar menú</span>
                  <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                </button>
              </div>
            </TransitionChild>

            <div className="relative flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 dark:bg-gray-900">
              <div className="relative flex h-16 shrink-0 items-center">
                <Logo />
              </div>
              <nav className="relative flex flex-1 flex-col">
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={cn(
                          item.current
                            ? 'bg-gray-50 text-indigo-600 dark:bg-white/5 dark:text-white'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white',
                          'group flex gap-x-3 rounded-md p-2 text-sm font-semibold',
                        )}
                      >
                        <item.icon
                          aria-hidden="true"
                          className={cn(
                            item.current
                              ? 'text-indigo-600 dark:text-white'
                              : 'text-gray-400 group-hover:text-indigo-600 dark:text-gray-500 dark:group-hover:text-white',
                            'size-6 shrink-0',
                          )}
                        />
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto space-y-2">
                  <button
                    onClick={onAddTaskClick}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-500"
                  >
                    <PlusIcon className="size-5" />
                    Nueva tarea
                  </button>
                </div>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Sidebar desktop colapsable */}
      <div
        className={cn(
          'hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col border-r border-gray-200 dark:border-white/10 bg-white dark:bg-gray-900 transition-[width] duration-300 ease-in-out',
          collapsed ? 'lg:w-20' : 'lg:w-72',
        )}
      >
        <div className={cn('relative flex grow flex-col overflow-y-auto', collapsed ? 'px-3' : 'px-6', 'gap-y-5')}>
          <div className="relative flex h-16 shrink-0 items-center">
            <Logo collapsed={collapsed} />
            <button
              onClick={() => setCollapsed((c) => !c)}
              className="ml-auto inline-flex items-center justify-center rounded-lg border border-black/10 bg-white/60 p-2 shadow-sm hover:bg-white/80 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
              aria-label={collapsed ? 'Expandir menú' : 'Colapsar menú'}
              title={collapsed ? 'Expandir' : 'Colapsar'}
            >
              {collapsed ? <ChevronRightIcon className="size-5" /> : <ChevronLeftIcon className="size-5" />}
            </button>
          </div>

          <nav className="relative flex-1">
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={cn(
                      item.current
                        ? 'bg-gray-50 text-indigo-600 dark:bg-white/5 dark:text-white'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white',
                      'group flex rounded-md p-2 text-sm font-semibold transition-colors',
                      collapsed ? 'justify-center' : 'items-center gap-x-3',
                    )}
                  >
                    <item.icon
                      aria-hidden="true"
                      className={cn(
                        item.current
                          ? 'text-indigo-600 dark:text-white'
                          : 'text-gray-400 group-hover:text-indigo-600 dark:text-gray-500 dark:group-hover:text-white',
                        'size-6 shrink-0',
                      )}
                    />
                    {!collapsed && <span className="truncate">{item.name}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Topbar móvil */}
      <div className="sticky top-0 z-40 flex items-center gap-x-3 bg-white/90 px-4 py-4 backdrop-blur sm:px-6 lg:hidden dark:bg-gray-900/80">
        <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-700 dark:text-gray-400">
          <span className="sr-only">Abrir menú</span>
          <Bars3Icon aria-hidden="true" className="size-6" />
        </button>
        <div className="flex-1 text-base font-semibold">ToList</div>
        {/* Botón de nueva tarea oculto en mobile para evitar duplicación */}
      </div>

      {/* Main con padding dinámico */}
      <main className={cn('relative transition-[padding] duration-300 ease-in-out', collapsed ? 'lg:pl-20' : 'lg:pl-72')}>
        <div className="px-4 pt-6 sm:px-6 lg:px-8">
          {/* Toolbar: TODO al lado izquierdo */}
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold tracking-tight">Tareas</h1>

            {/* Línea de filtros */}
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              {/* Grupo izquierdo */}
              <div className="flex flex-wrap items-center gap-2 md:gap-3">
                <a href="#all" className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-white/60 px-3 py-1.5 text-sm font-medium backdrop-blur hover:bg-white/80 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
                  <ListBulletIcon className="size-4" /> Todas
                </a>
                <a href="#pending" className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-white/60 px-3 py-1.5 text-sm font-medium backdrop-blur hover:bg-white/80 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
                  <ClockIcon className="size-4" /> Pendientes
                </a>
                <a href="#completed" className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-white/60 px-3 py-1.5 text-sm font-medium backdrop-blur hover:bg-white/80 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
                  <CheckCircleIcon className="size-4" /> Completadas
                </a>

                <button
                  onClick={onAddTaskClick}
                  className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500"
                >
                  <PlusIcon className="size-5" /> Nueva tarea
                </button>
              </div>

              {/*buscador*/}
              <div className="w-full sm:w-auto sm:ml-auto flex items-center gap-2">
                <div className="relative w-full sm:w-72 md:w-80">
                  <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="search"
                    placeholder="Buscar tareas…"
                    className="w-full rounded-lg border border-black/10 bg-white/60 py-2 pl-10 pr-3 text-sm outline-none backdrop-blur placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 dark:border-white/10 dark:bg-white/5"
                  />
                </div>
                <button
                  aria-label="Buscar"
                  className="inline-flex items-center justify-center rounded-lg border border-black/10 bg-white/60 p-2 text-sm shadow hover:bg-white/80 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  <MagnifyingGlassIcon className="size-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Contenido principal */}
          <section className="mt-6">
            {children}
          </section>
        </div>
      </main>
    </div>
  )
}
