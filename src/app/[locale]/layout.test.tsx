import { renderToStaticMarkup } from 'react-dom/server'
import { beforeEach, describe, expect, test, vi } from 'vitest'

const {
  interMock,
  getMessagesMock,
  setRequestLocaleMock,
  nextIntlProps,
  themeProviderProps,
} = vi.hoisted(() => ({
  interMock: vi.fn(() => ({ variable: 'inter-variable' })),
  getMessagesMock: vi.fn().mockResolvedValue({ greeting: 'hello' }),
  setRequestLocaleMock: vi.fn(),
  nextIntlProps: [] as Array<Record<string, unknown>>,
  themeProviderProps: [] as Array<Record<string, unknown>>,
}))

vi.mock('next/font/google', () => ({
  Inter: interMock,
}))

vi.mock('next-intl/server', () => ({
  getMessages: getMessagesMock,
  setRequestLocale: setRequestLocaleMock,
}))

vi.mock('next-intl', () => ({
  NextIntlClientProvider: ({ children, ...props }: any) => {
    nextIntlProps.push(props)
    return <div data-testid="next-intl-provider">{children}</div>
  },
}))

vi.mock('@/components/common/theme-provider', () => ({
  ThemeProvider: ({ children, ...props }: any) => {
    themeProviderProps.push(props)
    return <div data-testid="theme-provider">{children}</div>
  },
}))

vi.mock('@/components/common/ui/toaster', () => ({
  Toaster: () => <div data-testid="toaster" />,
}))

import RootLayout, {
  generateStaticParams,
  metadata,
  viewport,
} from '@/app/[locale]/layout'

describe('Root layout', () => {
  beforeEach(() => {
    nextIntlProps.length = 0
    themeProviderProps.length = 0
    getMessagesMock.mockClear()
    setRequestLocaleMock.mockClear()
  })

  test('exports metadata and viewport configuration', () => {
    expect(metadata.title).toBe('Vibe Engineers | Bring vibes into your code.')
    expect(metadata.openGraph?.url).toBe('https://vibe-engineers.dev')
    expect(viewport.themeColor).toEqual([
      { media: '(prefers-color-scheme: light)', color: '#f5f5f5' },
      { media: '(prefers-color-scheme: dark)', color: '#09090b' },
    ])
    expect(interMock).toHaveBeenCalledWith({ subsets: ['latin'], variable: '--font-inter' })
  })

  test('generates static params for the supported locales', () => {
    expect(generateStaticParams()).toEqual([{ locale: 'en' }, { locale: 'zh' }])
  })

  test('wraps the app with internationalization and theming providers', async () => {
    const result = await RootLayout({
      children: <div data-testid="page-content">Content</div>,
      params: Promise.resolve({ locale: 'en' }),
    })

    const markup = renderToStaticMarkup(result)
    const parser = new DOMParser()
    const doc = parser.parseFromString(markup, 'text/html')

    expect(setRequestLocaleMock).toHaveBeenCalledWith('en')
    expect(getMessagesMock).toHaveBeenCalledWith({ locale: 'en' })

    const html = doc.documentElement
    expect(html.getAttribute('lang')).toBe('en')

    const intlProvider = doc.querySelector('[data-testid="next-intl-provider"]')
    expect(intlProvider).not.toBeNull()
    expect(nextIntlProps[0]).toMatchObject({ locale: 'en', messages: { greeting: 'hello' } })

    const themeProvider = doc.querySelector('[data-testid="theme-provider"]')
    expect(themeProvider).not.toBeNull()
    expect(themeProviderProps[0]).toMatchObject({
      attribute: 'class',
      defaultTheme: 'system',
      enableSystem: true,
    })

    expect(doc.querySelector('[data-testid="page-content"]')).not.toBeNull()
    expect(doc.querySelector('[data-testid="toaster"]')).not.toBeNull()
  })
})