import Header from '@/components/common/header'
import Footer from '@/components/common/footer'
import { getTranslations } from 'next-intl/server'
import MotionSection from '@/components/common/motion-section'

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'termsOfService' })
  const sections = t.raw('sections') as {
    title?: string
    content: string
  }[]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <MotionSection>
          <div className="bg-background text-foreground">
            <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl mb-12 text-center">
                  {t('title')}
                </h1>
                <div className="prose dark:prose-invert max-w-none text-muted-foreground space-y-6">
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
                </div>
              </div>
            </div>
          </div>
        </MotionSection>
      </main>
      <Footer />
    </div>
  )
}
