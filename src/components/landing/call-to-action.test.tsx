import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'

import CallToAction from '@/components/landing/call-to-action'

vi.mock('next-intl', () => ({
  useTranslations: (namespace: string) => (key: string) =>
    `${namespace}.${key}`,
}))

vi.mock('next/image', () => ({
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />
  },
}))

vi.mock('@/navigation', () => ({
  Link: (props: any) => <a {...props} />,
}))

test('renders call to action with title, subcopy, and buttons', () => {
  render(<CallToAction />)

  expect(screen.getByText('callToAction.title')).toBeInTheDocument()
  expect(screen.getByText('callToAction.subcopy')).toBeInTheDocument()
  expect(screen.getByText('hero.primaryCta')).toBeInTheDocument()
  expect(screen.getByText('hero.secondaryCta')).toBeInTheDocument()
  expect(screen.getByText('notice.title')).toBeInTheDocument()
  expect(screen.getByText('notice.description')).toBeInTheDocument()
})
