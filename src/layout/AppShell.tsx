'use client'

import { type PropsWithChildren } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { GradientBG, ThemeToggle } from '../components/ui'

type AppShellProps = PropsWithChildren<{ onAddTaskClick?: () => void }>

export default function AppShell({ children, onAddTaskClick }: AppShellProps) {


  return (
    <div className=" isolate min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <GradientBG />

      <main className='mx-auto max-w-7xl transition-[padding] duration-300 ease-in-out'>
        <div className="px-4 pt-6 sm:px-6 lg:px-8">
          
          <div className="flex flex-col gap-4 max-w-5xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-semibold tracking-tight">ToList</h1>
                <button
                  onClick={onAddTaskClick}
                  className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500"
                >
                  <PlusIcon className="size-5" /> Nueva tarea
                </button>
              </div>
              <ThemeToggle />
            </div>
          </div>
          <section className="mt-6">
            {children}
          </section>
        </div>
      </main>
    </div>
  )
}
