'use client'
import { philosophyContent } from '@/lib/content'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/common/ui/card'
import { useTranslations } from 'next-intl'

export default function Philosophy() {
  const t = useTranslations('philosophy')
  return (
    <section id="philosophy" className="bg-background py-16 md:py-24">
      <div className="container px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-foreground/70">{t('subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {philosophyContent.principles.map((principle) => (
            <Card
              key={principle.key}
              className="flex flex-col overflow-hidden border-0 shadow-lg transition-transform motion-safe:hover:-translate-y-2 bg-card/50 max-w-lg mx-auto"
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <principle.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold">
                    {t(`principles.${principle.key}.title`)}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between p-6 pt-0">
                <p className="text-foreground/80">
                  {t(`principles.${principle.key}.description`)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-16 text-center">
          <blockquote className="mx-auto max-w-4xl text-2xl font-semibold italic text-foreground/80">
            &quot;{t('quote')}&quot;
          </blockquote>
          <p className="mt-4 text-lg text-foreground/70">
            — {t('quoteAuthor')}
          </p>
        </div>
      </div>
    </section>
  )
}
