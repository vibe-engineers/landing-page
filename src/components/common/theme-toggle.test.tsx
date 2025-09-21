import { render, screen, fireEvent } from '@testing-library/react'
import { expect, test, vi } from 'vitest'

import { ThemeToggle } from '@/components/common/theme-toggle'

const mockSetTheme = vi.fn()

vi.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: mockSetTheme,
  }),
}))

/**
 * Validates that the toggle renders with an accessible button.
 */
function rendersToggleButton() {
  render(<ThemeToggle />)
  expect(
    screen.getByRole('button', { name: 'Toggle theme' })
  ).toBeInTheDocument()
}

/**
 * Confirms the toggle invokes the setTheme callback.
 */
function callsSetThemeOnClick() {
  render(<ThemeToggle />)
  fireEvent.click(screen.getByRole('button', { name: 'Toggle theme' }))
  expect(mockSetTheme).toHaveBeenCalledWith('dark')
}

test('renders toggle button', rendersToggleButton)

test('calls setTheme on click', callsSetThemeOnClick)
