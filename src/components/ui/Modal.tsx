import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { type ReactNode } from 'react'

interface ModalProps {
  open: boolean
  onClose: (value: boolean) => void
  title: string
  description?: string
  children: ReactNode
}

export default function Modal({ open, onClose, title, description, children }: ModalProps) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-sm data-closed:opacity-0 transition-opacity" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-2xl border border-black/10 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-gray-900">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
            {description && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
            )}
          </div>
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  )
}
