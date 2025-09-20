'use client'

import Image, { ImageProps } from 'next/image'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

type LogoProps = Omit<ImageProps, 'src'> & {
  darkSrc?: string
  lightSrc?: string
}

export function ThemedLogo({ darkSrc, lightSrc, alt, ...props }: LogoProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const src = mounted && resolvedTheme === 'dark' ? darkSrc : lightSrc

  return <Image src={src ?? ''} alt={alt} {...props} />
}
