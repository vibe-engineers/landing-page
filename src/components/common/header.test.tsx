import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'

import Header from '@/components/header'

vi.mock('next/image', () => ({
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />
  },
}))

vi.mock('next-themes', () => ({
  useTheme: () => ({
    resolvedTheme: 'light',
    setTheme: vi.fn(),
  }),
}))

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}))

vi.mock('@/navigation', () => ({
  Link: (props: any) => <a {...props} />,
  usePathname: () => '/',
}))

vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}))

test('renders header with navigation and theme toggle', () => {
  render(<Header />)

  expect(screen.getByAltText('Vibe Engineers Logo')).toBeInTheDocument()
  expect(screen.getByText('navLinks.tools')).toBeInTheDocument()
  expect(screen.getByText('navLinks.philosophy')).toBeInTheDocument()
  expect(screen.getByText('navLinks.examples')).toBeInTheDocument()
  expect(screen.getByText('navLinks.faq')).toBeInTheDocument()
  expect(screen.getByLabelText('GitHub')).toBeInTheDocument()
  expect(screen.getByLabelText('Discord')).toBeInTheDocument()
  // The theme toggle button does not have a name, so we can't search it by name
  // expect(screen.getByRole('button', { name: 'Toggle theme' })).toBeInTheDocument()
})
