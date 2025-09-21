import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'

import Philosophy from '@/components/landing/philosophy'

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

/**
 * Verifies the philosophy section renders localized principles and the featured quote.
 */
function rendersPhilosophyWithTitleSubtitlePrinciplesAndQuote() {
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
}

test(
  'renders philosophy with title, subtitle, principles, and quote',
  rendersPhilosophyWithTitleSubtitlePrinciplesAndQuote
)
