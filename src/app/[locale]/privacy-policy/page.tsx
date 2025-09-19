import Header from '@/components/common/header'
import Footer from '@/components/common/footer'
import LegalPage from '@/components/common/legal-page'
import { getTranslations } from 'next-intl/server'

export default async function PrivacyPage() {
  const t = await getTranslations('privacyPolicy')
  const sections = t.raw('sections') as {
    title?: string
    content: string
  }[]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <LegalPage title={t('title')}>
          {sections.map((section, index) => (
            <div key={index} className="mb-6">
              {section.title && (
                <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
                  {section.title}
                </h2>
              )}
              <p>
                {t.rich(`sections.${index}.content`, {
                  emailLink: (chunks) => (
                    <a href={`mailto:${chunks}`} className="underline">
                      {chunks}
                    </a>
                  ),
                })}
              </p>
            </div>
          ))}
          <p className="mt-10 text-sm text-muted-foreground">
            {t('lastUpdated')}
          </p>
        </LegalPage>
      </main>
      <Footer />
    </div>
  )
}
