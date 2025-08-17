import { createContext, useContext } from 'react'

interface ToastContextType {
  toast: {
    success: (message: string, duration?: number) => string
    error: (message: string, duration?: number) => string
    info: (message: string, duration?: number) => string
  }
}

export const ToastContext = createContext<ToastContextType | null>(null)

export function useToastContext() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider')
  }
  return context
}
