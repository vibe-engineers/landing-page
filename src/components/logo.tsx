'use client'

import Image, { ImageProps } from 'next/image'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function Logo(props: Omit<ImageProps, 'src' | 'alt'>) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const src =
    mounted && resolvedTheme === 'dark'
      ? '/images/dark-theme-logo.webp'
      : '/images/light-theme-logo.webp' // server/first paint uses light

  return <Image src={src} alt="Vibe Engineers Logo" {...props} />
}
