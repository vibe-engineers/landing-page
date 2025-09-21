import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'

import CallToAction from '@/components/landing/call-to-action'

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

/**
 * Checks that the call-to-action renders translated messaging and buttons.
 */
function rendersCallToActionWithTitleSubcopyAndButtons() {
  render(<CallToAction />)

  expect(screen.getByText('callToAction.title')).toBeInTheDocument()
  expect(screen.getByText('callToAction.subcopy')).toBeInTheDocument()
  expect(screen.getByText('hero.primaryCta')).toBeInTheDocument()
  expect(screen.getByText('hero.secondaryCta')).toBeInTheDocument()
  expect(screen.getByText('notice.title')).toBeInTheDocument()
  expect(screen.getByText('notice.description')).toBeInTheDocument()
}

test(
  'renders call to action with title, subcopy, and buttons',
  rendersCallToActionWithTitleSubcopyAndButtons
)
