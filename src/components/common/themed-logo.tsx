'use client'

import Image, { ImageProps } from 'next/image'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

type LogoProps = Omit<ImageProps, 'src'> & {
  darkSrc?: string
  lightSrc?: string
}

/**
 * Chooses between light and dark logo sources based on the resolved theme.
 *
 * @param props - The logo image props including theme-specific sources.
 * @returns A Next.js image element for the appropriate theme.
 */
export function ThemedLogo({ darkSrc, lightSrc, alt, ...props }: LogoProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const src = mounted && resolvedTheme === 'dark' ? darkSrc : lightSrc

  return <Image src={src ?? ''} alt={alt} {...props} />
}
