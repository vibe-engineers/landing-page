import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'

import { ThemedLogo } from '@/components/common/themed-logo'

vi.mock('next/image', () => ({
  default: ({ alt = '', ...rest }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt} {...rest} />
  },
}))

vi.mock('next-themes', () => ({
  useTheme: () => ({
    resolvedTheme: 'light',
  }),
}))

/**
 * Ensures the light logo renders when the theme is resolved to light.
 */
function rendersLightThemeLogoByDefault() {
  render(
    <ThemedLogo
      darkSrc="/images/dark-theme-logo.webp"
      lightSrc="/images/light-theme-logo.webp"
      alt="Vibe Engineers Logo"
    />
  )

  const logo = screen.getByAltText('Vibe Engineers Logo')
  expect(logo).toHaveAttribute('src', '/images/light-theme-logo.webp')
}

test('renders light theme logo by default', rendersLightThemeLogoByDefault)
