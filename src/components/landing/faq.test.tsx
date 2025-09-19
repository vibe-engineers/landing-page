import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'

import FAQ from '@/components/landing/faq'

vi.mock('next-intl', () => ({
  useTranslations: (namespace: string) => (key: string) =>
    `${namespace}.${key}`,
}))

vi.mock('@/lib/content', () => ({
  faqContent: ['q1', 'q2'],
}))

import { fireEvent } from '@testing-library/react'

test('renders FAQ with title, subtitle, and accordion', () => {
  render(<FAQ />)

  expect(screen.getByText('faq.title')).toBeInTheDocument()
  expect(screen.getByText('faq.subtitle')).toBeInTheDocument()
  expect(screen.getByText('faq.q1.question')).toBeInTheDocument()
  expect(screen.getByText('faq.q2.question')).toBeInTheDocument()

  // Answers are not visible by default
  expect(screen.queryByText('faq.q1.answer')).not.toBeInTheDocument()
  expect(screen.queryByText('faq.q2.answer')).not.toBeInTheDocument()

  // Click on the first question to reveal the answer
  fireEvent.click(screen.getByText('faq.q1.question'))
  expect(screen.getByText('faq.q1.answer')).toBeInTheDocument()

  // Click on the second question to reveal the answer
  fireEvent.click(screen.getByText('faq.q2.question'))
  expect(screen.getByText('faq.q2.answer')).toBeInTheDocument()
})
