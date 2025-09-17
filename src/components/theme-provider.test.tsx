import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'

import { ThemeProvider } from '@/components/theme-provider'

vi.mock('next-themes', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="next-themes-provider">{children}</div>
  ),
}))

test('renders children', () => {
  render(
    <ThemeProvider>
      <div>Child</div>
    </ThemeProvider>
  )

  expect(screen.getByTestId('next-themes-provider')).toBeInTheDocument()
  expect(screen.getByText('Child')).toBeInTheDocument()
})
