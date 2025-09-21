import { render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { ThemedLogo } from '@/components/common/themed-logo'

vi.mock('next/image', () => ({
  default: ({ alt = '', ...rest }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt} {...rest} />
  },
}))

const { useThemeMock } = vi.hoisted(() => ({
  useThemeMock: vi.fn(() => ({ resolvedTheme: 'dark' })),
}))

vi.mock('next-themes', () => ({
  useTheme: () => useThemeMock(),
}))

/**
 * Restores the theme mock to default dark mode before each test.
 */
function resetThemeMock() {
  useThemeMock.mockReturnValue({ resolvedTheme: 'dark' })
}

/**
 * Confirms the dark logo renders when the theme resolves to dark.
 */
async function switchesToTheDarkLogoWhenTheThemeResolvesToDark() {
  render(
    <ThemedLogo
      lightSrc="/images/light.png"
      darkSrc="/images/dark.png"
      alt="Vibe Engineers Logo"
      data-testid="logo"
    />
  )

  const image = screen.getByTestId('logo') as HTMLImageElement

  await waitFor(() => {
    expect(image.getAttribute('src')).toBe('/images/dark.png')
  })
}

/**
 * Verifies the light logo is used when the theme resolves to light.
 */
function usesTheLightLogoWhenTheThemeIsLight() {
  useThemeMock.mockReturnValue({ resolvedTheme: 'light' })

  render(
    <ThemedLogo
      lightSrc="/images/light.png"
      darkSrc="/images/dark.png"
      alt="Vibe Engineers Logo"
      data-testid="logo"
    />
  )

  const image = screen.getByTestId('logo') as HTMLImageElement
  expect(image.getAttribute('src')).toBe('/images/light.png')
}

/**
 * Ensures the component falls back to an empty source when no logos are supplied.
 */
function fallsBackToAnEmptySourceWhenNoLogosAreProvided() {
  render(<ThemedLogo alt="Vibe Engineers Logo" data-testid="logo" />)

  const image = screen.getByTestId('logo') as HTMLImageElement
  expect(image.getAttribute('src')).toBe('')
}

describe('ThemedLogo', () => {
  beforeEach(resetThemeMock)

  test(
    'switches to the dark logo when the theme resolves to dark',
    switchesToTheDarkLogoWhenTheThemeResolvesToDark
  )

  test('uses the light logo when the theme is light', usesTheLightLogoWhenTheThemeIsLight)

  test(
    'falls back to an empty source when no logos are provided',
    fallsBackToAnEmptySourceWhenNoLogosAreProvided
  )
})