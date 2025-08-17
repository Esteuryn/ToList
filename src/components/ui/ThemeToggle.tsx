import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import { useTheme } from '../../hooks'
import Button from './Button'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      onClick={toggleTheme}
      variant="secondary"
      size="sm"
      className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <MoonIcon className="h-5 w-5" />
      ) : (
        <SunIcon className="h-5 w-5" />
      )}
    </Button>
  )
}
