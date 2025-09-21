import Header from '@/components/common/header'
import Footer from '@/components/common/footer'
import TeamPage from '@/components/team/team-page'
import { getTranslations } from 'next-intl/server'

/**
 * Renders the localized team page with translated headings.
 *
 * @param props - The locale parameter promise supplied by Next.js routing.
 * @returns The team page layout for the requested locale.
 */
export default async function Team({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'teamPage' })

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <TeamPage title={t('title')} subtitle={t('subtitle')} />
      </main>
      <Footer />
    </div>
  )
}
