import { useCallback, useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'oea-theme'
const THEME_COLOR: Record<Theme, string> = {
  dark: '#161320',
  light: '#f7f4fb',
}

function readStoredTheme(): Theme | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    return value === 'dark' || value === 'light' ? value : null
  } catch {
    return null
  }
}

function activeTheme(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
  root.style.colorScheme = theme
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', THEME_COLOR[theme])
}

/**
 * Theme lives on <html class="dark">. The inline script in index.html sets the
 * initial value before first paint, so this hook only has to keep it in sync
 * and persist choices.
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => activeTheme())

  useEffect(() => {
    applyTheme(theme)
    try {
      window.localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* storage can be unavailable in private mode — the class still applies */
    }
  }, [theme])

  // Keep a second tab in sync if the user opens the site twice.
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return
      const next = readStoredTheme()
      if (next) setThemeState(next)
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((current) => (current === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, setTheme: setThemeState, toggleTheme }
}
