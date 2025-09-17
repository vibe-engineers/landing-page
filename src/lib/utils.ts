import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { MouseEvent as ReactMouseEvent } from 'react'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function scrollToSection(event: ReactMouseEvent<HTMLAnchorElement>) {
  const href = event.currentTarget.getAttribute('href')

  if (!href) return

  // case 1: homepage root
  const isSeekingHomePageRoot = /^\/(en|zh)?$/.test(href)
  if (isSeekingHomePageRoot) {
    const isOnHomePage = /^\/(en|zh)?$/.test(window.location.pathname)
    // already on homepage, scroll to top
    if (isOnHomePage) {
      event.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
    return
  }

  // case 2: hash-based scrolling
  if (href.includes('#')) {
    event.preventDefault()
    const hash = href.substring(href.indexOf('#'))

    if (hash === '#' || hash === '#top') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
      return
    }

    if (hash.length > 1) {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      } else {
        const localeMatch = window.location.pathname.match(/^\/(en|zh)(?=\/|$)/)
        const homePath = localeMatch ? `/${localeMatch[1]}` : '/'
        const normalizedHomePath = homePath === '/' ? '' : homePath

        window.location.href = `${normalizedHomePath}/#${hash.slice(1)}`
      }
    }
  }
}
