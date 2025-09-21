import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, test, vi, beforeEach } from 'vitest'

import Footer from '@/components/common/footer'

const { scrollToSectionMock } = vi.hoisted(() => ({
  scrollToSectionMock: vi.fn(),
}))

vi.mock('@/components/common/themed-logo', () => ({
  ThemedLogo: ({ lightSrc: _lightSrc, darkSrc: _darkSrc, ...props }: any) => (
    <div data-testid="themed-logo" {...props} />
  ),
}))

vi.mock('@/navigation', () => ({
  Link: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}))

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}))

vi.mock('@/lib/utils', async () => {
  const actual = await vi.importActual<typeof import('@/lib/utils')>(
    '@/lib/utils'
  )

  return {
    ...actual,
    scrollToSection: scrollToSectionMock,
  }
})

describe('Footer', () => {
  beforeEach(() => {
    scrollToSectionMock.mockClear()
  })

  test('renders navigation sections and social links', () => {
    render(<Footer />)

    expect(screen.getByTestId('themed-logo')).toBeInTheDocument()

    const aboutSection = screen.getByRole('heading', { name: 'footer.nav.about.title' })
    const contributeSection = screen.getByRole('heading', {
      name: 'footer.nav.contribute.title',
    })
    const legalSection = screen.getByRole('heading', { name: 'footer.nav.legal.title' })

    expect(aboutSection).toBeInTheDocument()
    expect(contributeSection).toBeInTheDocument()
    expect(legalSection).toBeInTheDocument()

    const aboutLinks = within(aboutSection.parentElement as HTMLElement).getAllByRole(
      'link'
    )
    expect(aboutLinks.map((link) => link.getAttribute('href'))).toEqual([
      '/team',
      'https://github.com/sponsors/vibe-engineers',
    ])

    expect(
      screen.getByRole('link', { name: 'footer.nav.contribute.links.sponsor' })
    ).toHaveAttribute('href', 'https://github.com/sponsors/vibe-engineers')
    expect(
      screen.getByRole('link', { name: 'footer.nav.legal.links.privacy' })
    ).toHaveAttribute('href', '/privacy-policy')

    expect(screen.getByLabelText('GitHub')).toBeInTheDocument()
    expect(screen.getByLabelText('Discord')).toBeInTheDocument()

    const year = new Date().getFullYear()
    expect(screen.getByText(`© ${year} siteConfig.name. footer.rights`)).toBeInTheDocument()
  })

  test('invokes scrollToSection when brand link is clicked', () => {
    render(<Footer />)

    const brandLink = screen.getByRole('link', { name: /siteConfig.name/ })

    fireEvent.click(brandLink)

    expect(scrollToSectionMock).toHaveBeenCalledTimes(1)
  })
})