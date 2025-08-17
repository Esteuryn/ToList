import { type ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition rounded-lg'
    
    const variantStyles = {
      primary: 'bg-indigo-600 text-white shadow hover:bg-indigo-500',
      secondary: 'border border-black/10 bg-white/60 hover:bg-white/80 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10',
      danger: 'bg-red-600 text-white shadow hover:bg-red-500'
    }
    
    const sizeStyles = {
      sm: 'px-2.5 py-1.5 text-xs',
      md: 'px-3.5 py-2 text-sm',
      lg: 'px-4 py-2.5 text-base'
    }
    
    const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`
    
    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
