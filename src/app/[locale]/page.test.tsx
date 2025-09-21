import { render, screen } from '@testing-library/react'
import { describe, expect, test, vi, beforeEach } from 'vitest'

const motionSectionMock = vi.fn(({ children }: any) => (
  <section data-testid="motion-section">{children}</section>
))

vi.mock('@/components/common/header', () => ({
  default: () => <div data-testid="header">Header</div>,
}))

vi.mock('@/components/common/footer', () => ({
  default: () => <div data-testid="footer">Footer</div>,
}))

vi.mock('@/components/landing/hero', () => ({
  default: () => <div data-testid="hero">Hero section</div>,
}))

vi.mock('@/components/landing/tools-grid', () => ({
  default: () => <div data-testid="tools-grid">Tools Grid</div>,
}))

vi.mock('@/components/landing/philosophy', () => ({
  default: () => <div data-testid="philosophy">Philosophy</div>,
}))

vi.mock('@/components/landing/code-examples', () => ({
  default: () => <div data-testid="code-examples">Code Examples</div>,
}))

vi.mock('@/components/landing/faq', () => ({
  default: () => <div data-testid="faq">FAQ</div>,
}))

vi.mock('@/components/landing/call-to-action', () => ({
  default: () => <div data-testid="cta">CTA</div>,
}))

vi.mock('@/components/common/motion-section', () => ({
  default: (props: any) => motionSectionMock(props),
}))

import Home, { generateStaticParams } from '@/app/[locale]/page'

/**
 * Clears motion section spy state between tests.
 */
function resetMotionSectionSpy() {
  motionSectionMock.mockClear()
}

/**
 * Ensures static parameters are generated for each supported locale.
 */
function definesStaticParamsForSupportedLocales() {
  expect(generateStaticParams()).toEqual([{ locale: 'en' }, { locale: 'zh' }])
}

/**
 * Verifies the home page renders all major landing sections.
 */
function rendersAllLandingPageSections() {
  render(<Home />)

  expect(screen.getByTestId('header')).toBeInTheDocument()
  expect(screen.getByTestId('footer')).toBeInTheDocument()

  expect(screen.getByTestId('hero')).toBeInTheDocument()
  expect(screen.getByTestId('tools-grid')).toBeInTheDocument()
  expect(screen.getByTestId('philosophy')).toBeInTheDocument()
  expect(screen.getByTestId('code-examples')).toBeInTheDocument()
  expect(screen.getByTestId('faq')).toBeInTheDocument()
  expect(screen.getByTestId('cta')).toBeInTheDocument()

  expect(screen.getAllByTestId('motion-section')).toHaveLength(6)
  expect(motionSectionMock).toHaveBeenCalledTimes(6)
}

describe('Home page', () => {
  beforeEach(resetMotionSectionSpy)

  test('defines static params for supported locales', definesStaticParamsForSupportedLocales)

  test('renders all landing page sections', rendersAllLandingPageSections)
})