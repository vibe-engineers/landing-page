import { render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

const { getTranslationsMock } = vi.hoisted(() => {
  const sections = [
    { title: 'Section One', content: 'section-one-content' },
    { content: 'section-two-content' },
  ]

  const translations = {
    title: 'Terms of Service',
    lastUpdated: 'Last updated on Oct 1, 2024',
  }

  const translator = Object.assign(
    (key: string) => translations[key as keyof typeof translations] ?? key,
    {
      raw: (key: string) => {
        if (key === 'sections') {
          return sections
        }
        return null
      },
      rich: (_key: string, { emailLink }: any) => emailLink('legal@vibe.dev'),
    }
  )

  return {
    getTranslationsMock: vi.fn().mockResolvedValue(translator),
  }
})

vi.mock('next-intl/server', () => ({
  getTranslations: getTranslationsMock,
}))

vi.mock('@/components/common/header', () => ({
  default: () => <header data-testid="header" />,
}))

vi.mock('@/components/common/footer', () => ({
  default: () => <footer data-testid="footer" />,
}))

vi.mock('@/components/common/motion-section', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <section data-testid="motion-section">{children}</section>
  ),
}))

import TermsPage from '@/app/[locale]/terms-of-service/page'

/**
 * Verifies the terms of service route renders localized content and metadata.
 */
async function rendersTranslatedSectionsAndMetadata() {
  const element = await TermsPage({ params: Promise.resolve({ locale: 'en' }) })
  const { container } = render(element)

  expect(getTranslationsMock).toHaveBeenCalledWith({
    locale: 'en',
    namespace: 'termsOfService',
  })

  expect(screen.getByTestId('header')).toBeInTheDocument()
  expect(screen.getByTestId('footer')).toBeInTheDocument()
  expect(
    screen.getByRole('heading', { name: 'Terms of Service', level: 1 })
  ).toBeInTheDocument()

  const sectionHeadings = screen.getAllByRole('heading', { level: 2 })
  expect(sectionHeadings).toHaveLength(1)
  expect(sectionHeadings[0]).toHaveTextContent('Section One')

  const emailLink = container.querySelector('a[href="mailto:legal@vibe.dev"]')
  expect(emailLink).not.toBeNull()
  expect(emailLink).toHaveTextContent('legal@vibe.dev')

  expect(screen.getByText('Last updated on Oct 1, 2024')).toBeInTheDocument()
}

describe('Terms of Service page', () => {
  test(
    'renders translated sections and metadata',
    rendersTranslatedSectionsAndMetadata
  )
})
