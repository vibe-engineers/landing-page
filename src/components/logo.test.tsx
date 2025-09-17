import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'

import { Logo } from '@/components/logo'

vi.mock('next/image', () => ({
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />
  },
}))

vi.mock('next-themes', () => ({
  useTheme: () => ({
    resolvedTheme: 'light',
  }),
}))

test('renders light theme logo by default', () => {
  render(<Logo />)

  const logo = screen.getByAltText('Vibe Engineers Logo')
  expect(logo).toHaveAttribute('src', '/images/light-theme-logo.webp')
})
