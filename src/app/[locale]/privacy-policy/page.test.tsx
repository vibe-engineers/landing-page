import { render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

const { getTranslationsMock } = vi.hoisted(() => {
  const sections = [
    { title: 'Data Collection', content: 'data-collection' },
    { content: 'data-usage' },
  ]

  const translations = {
    title: 'Privacy Policy',
    lastUpdated: 'Updated on Sep 25, 2024',
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
      rich: (_key: string, { emailLink }: any) => emailLink('privacy@vibe.dev'),
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

import PrivacyPage from '@/app/[locale]/privacy-policy/page'

/**
 * Ensures the privacy policy route fetches translations and renders the expected content.
 */
async function rendersTranslatedContentSections() {
  const element = await PrivacyPage({
    params: Promise.resolve({ locale: 'zh' }),
  })
  const { container } = render(element)

  expect(getTranslationsMock).toHaveBeenCalledWith({
    locale: 'zh',
    namespace: 'privacyPolicy',
  })

  expect(
    screen.getByRole('heading', { name: 'Privacy Policy', level: 1 })
  ).toBeInTheDocument()
  expect(screen.getAllByRole('heading', { level: 2 })[0]).toHaveTextContent(
    'Data Collection'
  )

  const emailLink = container.querySelector('a[href="mailto:privacy@vibe.dev"]')
  expect(emailLink).not.toBeNull()
  expect(emailLink).toHaveTextContent('privacy@vibe.dev')

  expect(screen.getByText('Updated on Sep 25, 2024')).toBeInTheDocument()
}

describe('Privacy Policy page', () => {
  test('renders translated content sections', rendersTranslatedContentSections)
})
