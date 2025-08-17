import { useEffect, useState } from 'react'
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface ToastProps {
  id: string
  message: string
  type?: 'success' | 'error' | 'info'
  duration?: number
  onClose: (id: string) => void
}

export default function Toast({ id, message, type = 'success', duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10)
    
    const closeTimer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onClose(id), 300)
    }, duration)

    return () => {
      clearTimeout(timer)
      clearTimeout(closeTimer)
    }
  }, [id, duration, onClose])

  const typeStyles = {
    success: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200',
    error: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200',
    info: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200'
  }

  const iconMap = {
    success: CheckCircleIcon,
    error: XMarkIcon,
    info: CheckCircleIcon
  }

  const Icon = iconMap[type]

  return (
    <div
      className={`
        flex items-center gap-3 p-4 rounded-lg border shadow-lg backdrop-blur-sm
        transform transition-all duration-300 ease-out
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        ${typeStyles[type]}
      `}
    >
      <Icon className="size-5 flex-shrink-0" />
      <p className="text-sm font-medium flex-1">{message}</p>
      <button
        onClick={() => {
          setIsVisible(false)
          setTimeout(() => onClose(id), 300)
        }}
        className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
      >
        <XMarkIcon className="size-4" />
      </button>
    </div>
  )
}
