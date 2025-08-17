import { useState, useCallback } from 'react'
import { type ToastItem } from '../components/ui/ToastContainer'

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const addToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success', duration = 3000) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast: ToastItem = { id, message, type, duration }
    
    setToasts(prev => [...prev, newToast])
    
    return id
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const clearToasts = useCallback(() => {
    setToasts([])
  }, [])

  return {
    toasts,
    addToast,
    removeToast,
    clearToasts,
    toast: {
      success: (message: string, duration?: number) => addToast(message, 'success', duration),
      error: (message: string, duration?: number) => addToast(message, 'error', duration),
      info: (message: string, duration?: number) => addToast(message, 'info', duration),
    }
  }
}
