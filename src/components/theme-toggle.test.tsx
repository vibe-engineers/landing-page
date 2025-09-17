import { render, screen, fireEvent } from '@testing-library/react'
import { expect, test, vi } from 'vitest'

import { ThemeToggle } from '@/components/theme-toggle'

const mockSetTheme = vi.fn()

vi.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: mockSetTheme,
  }),
}))

test('renders toggle button', () => {
  render(<ThemeToggle />)
  expect(screen.getByRole('button', { name: 'Toggle theme' })).toBeInTheDocument()
})

test('calls setTheme on click', () => {
  render(<ThemeToggle />)
  fireEvent.click(screen.getByRole('button', { name: 'Toggle theme' }))
  expect(mockSetTheme).toHaveBeenCalledWith('dark')
})
