import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../lib/theme'

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      aria-pressed={isDark}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      className={`group relative flex h-11 w-11 items-center justify-center text-ink-muted transition-colors hover:text-ink ${className}`}
    >
      <span className="relative block h-[18px] w-[18px]">
        <Sun
          size={18}
          aria-hidden="true"
          className={`absolute inset-0 transition-all duration-500 ease-out ${
            isDark ? 'rotate-90 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100'
          }`}
        />
        <Moon
          size={18}
          aria-hidden="true"
          className={`absolute inset-0 transition-all duration-500 ease-out ${
            isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0'
          }`}
        />
      </span>
    </button>
  )
}
