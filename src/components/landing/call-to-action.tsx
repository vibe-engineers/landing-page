'use client'

import { heroContent } from '@/lib/content'
import { Button } from '../common/ui/button'
import { Link } from '@/navigation'
import { ThemedLogo } from '@/components/common/themed-logo'
import { scrollToSection } from '@/lib/utils'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/common/ui/alert'
import { AlertTriangle } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function CallToAction() {
  const t = useTranslations('callToAction')
  const tHero = useTranslations('hero')
  const tNotice = useTranslations('notice')

  return (
    <section id="use-cases" className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            {t('title')}
          </h2>
          <ThemedLogo
            darkSrc="/images/dark-theme-logo.webp"
            lightSrc="/images/light-theme-logo.webp"
            width={200}
            height={200}
            className="mt-6"
          />
          <p className="mt-4 text-lg text-foreground/70">{t('subcopy')}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="motion-safe:hover:scale-105 transition-transform"
            >
              <Link
                href={heroContent.primaryCta.href}
                onClick={scrollToSection}
              >
                {tHero('primaryCta')}
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="motion-safe:hover:scale-105 transition-transform"
            >
              <Link href={heroContent.secondaryCta.href}>
                {tHero('secondaryCta')}
              </Link>
            </Button>
          </div>
        </div>
        <div className="container px-4 mt-16">
          <Alert className="max-w-4xl mx-auto border-primary/20 bg-primary/10 dark:bg-primary/15">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 stroke-primary translate-y-[-1.5px]" />
              <AlertTitle className="font-headline text-xl text-primary">
                {tNotice('title')}
              </AlertTitle>
            </div>
            <AlertDescription className="text-muted-foreground">
              {tNotice('description')}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </section>
  )
}
