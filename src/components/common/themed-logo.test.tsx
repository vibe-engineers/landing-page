import { render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { ThemedLogo } from '@/components/common/themed-logo'

vi.mock('next/image', () => ({
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />
  },
}))

const { useThemeMock } = vi.hoisted(() => ({
  useThemeMock: vi.fn(() => ({ resolvedTheme: 'dark' })),
}))

vi.mock('next-themes', () => ({
  useTheme: () => useThemeMock(),
}))

describe('ThemedLogo', () => {
  beforeEach(() => {
    useThemeMock.mockReturnValue({ resolvedTheme: 'dark' })
  })

  test('switches to the dark logo when the theme resolves to dark', async () => {
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
  })

  test('uses the light logo when the theme is light', () => {
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
  })

  test('falls back to an empty source when no logos are provided', () => {
    render(<ThemedLogo alt="Vibe Engineers Logo" data-testid="logo" />)

    const image = screen.getByTestId('logo') as HTMLImageElement
    expect(image.getAttribute('src')).toBe('')
  })
})