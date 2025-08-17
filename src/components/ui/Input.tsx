import { type InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, id, ...props }, ref) => {
    const baseStyles = 'w-full rounded-lg border border-black/10 bg-white/60 px-3 py-2 text-sm outline-none backdrop-blur placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 dark:border-white/10 dark:bg-white/5 text-gray-900 dark:text-white'
    
    return (
      <div>
        {label && (
          <label htmlFor={id} className="block text-sm font-medium mb-1 text-gray-900 dark:text-white">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={`${baseStyles} ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
