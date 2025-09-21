'use client'

import * as React from 'react'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

/**
 * Wraps the NextThemes provider to expose theme context to client components.
 *
 * @param props - The theme provider props including the child nodes to render.
 * @returns The themed provider element.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
