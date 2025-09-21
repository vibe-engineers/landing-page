import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

// Can be imported from a shared config
export const locales = ['en', 'zh']

/**
 * Configures next-intl to load locale-specific translations and handle unknown locales.
 */
export default getRequestConfig(async ({ locale }) => {
  const lng = locale ?? 'en'
  if (!locales.includes(lng)) notFound()

  return {
    locale: lng,
    messages: (await import(`../../messages/${lng}.json`)).default,
  }
})
