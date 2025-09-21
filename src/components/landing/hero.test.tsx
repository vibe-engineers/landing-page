import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'

import Hero from '@/components/landing/hero'

vi.mock('next-intl', () => ({
  useTranslations: (namespace: string) => (key: string) =>
    `${namespace}.${key}`,
}))

vi.mock('next/image', () => ({
  default: ({ alt = '', ...rest }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt} {...rest} />
  },
}))

vi.mock('@/navigation', () => ({
  Link: (props: any) => <a {...props} />,
}))

vi.mock('@/components/landing/confetti', () => ({
  ConfettiBackground: () => <div data-testid="confetti" />,
}))

/**
 * Ensures the hero component renders core messaging and actions.
 */
function rendersHeroWithTitleTaglineSubcopyAndButtons() {
  render(<Hero />)

  expect(screen.getByText('siteConfig.name')).toBeInTheDocument()
  expect(screen.getByText('hero.tagline')).toBeInTheDocument()
  expect(screen.getByText('hero.subcopy')).toBeInTheDocument()
  expect(screen.getByText('hero.primaryCta')).toBeInTheDocument()
  expect(screen.getByText('hero.secondaryCta')).toBeInTheDocument()
  expect(screen.getByTestId('confetti')).toBeInTheDocument()
}

test(
  'renders hero with title, tagline, subcopy, and buttons',
  rendersHeroWithTitleTaglineSubcopyAndButtons
)
