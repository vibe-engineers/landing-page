import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'

import Philosophy from '@/components/philosophy'

vi.mock('next-intl', () => ({
  useTranslations: (namespace: string) => (key: string) =>
    `${namespace}.${key}`,
}))

vi.mock('@/lib/content', () => ({
  philosophyContent: {
    principles: [
      {
        key: 'playful',
        icon: () => <div />,
      },
      {
        key: 'nonDeterminism',
        icon: () => <div />,
      },
    ],
  },
}))

test('renders philosophy with title, subtitle, principles, and quote', () => {
  render(<Philosophy />)

  expect(screen.getByText('philosophy.title')).toBeInTheDocument()
  expect(screen.getByText('philosophy.subtitle')).toBeInTheDocument()
  expect(
    screen.getByText('philosophy.principles.playful.title')
  ).toBeInTheDocument()
  expect(
    screen.getByText('philosophy.principles.playful.description')
  ).toBeInTheDocument()
  expect(
    screen.getByText('philosophy.principles.nonDeterminism.title')
  ).toBeInTheDocument()
  expect(
    screen.getByText('philosophy.principles.nonDeterminism.description')
  ).toBeInTheDocument()
  expect(screen.getByText('"philosophy.quote"')).toBeInTheDocument()
  expect(screen.getByText('— philosophy.quoteAuthor')).toBeInTheDocument()
})
