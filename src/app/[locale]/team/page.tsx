import Header from '@/components/header'
import Footer from '@/components/footer'
import TeamPage from '@/components/team-page'
import { getTranslations } from 'next-intl/server'

export default async function Team() {
  const t = await getTranslations('teamPage')

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <TeamPage title={t('title')} />
      </main>
      <Footer />
    </div>
  )
}
