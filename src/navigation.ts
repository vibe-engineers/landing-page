import { createNavigation } from 'next-intl/navigation'
import { locales } from './i18n/request'

/**
 * Provides typed navigation helpers that are aware of the locales supported by the app.
 */
export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales,
})
