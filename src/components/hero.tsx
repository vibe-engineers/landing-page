'use client'

import { Link } from '@/navigation'
import { Button } from '@/components/ui/button'
import { heroContent } from '@/lib/content'
import { Zap } from 'lucide-react'
import { Logo } from '@/components/logo'
import { scrollToSection } from '@/lib/utils'
import { ConfettiBackground } from '@/components/confetti'
import { useTranslations } from 'next-intl'

export default function Hero() {
  const t = useTranslations('hero')
  const tSite = useTranslations('siteConfig')

  return (
    <section
      id="hero"
      className="relative flex h-[calc(100vh-56px)] flex-col items-center justify-center pt-4 pb-20 md:pt-10 md:pb-32"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 top-0 -z-10 h-full w-full bg-background"
      >
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(128,0,128,0.2)] opacity-50 blur-[80px]"></div>
        <ConfettiBackground />
      </div>
      <div className="container px-4 text-center">
        <div className="mx-auto flex max-w-4xl flex-col items-center">
          <Logo width={150} height={150} />
          <div className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <Zap className="mr-2 h-4 w-4" />
            {t('announcement')}
          </div>
          <h1 className="font-headline text-5xl font-black tracking-tighter sm:text-7xl md:text-8xl">
            {tSite('name')}
          </h1>
          <p className="mt-4 font-headline text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            {t('tagline')}
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/80 md:text-xl">
            {t('subcopy')}
          </p>
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
                {t('primaryCta')}
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="motion-safe:hover:scale-105 transition-transform"
            >
              <Link href={heroContent.secondaryCta.href}>
                {t('secondaryCta')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <Link
        href={heroContent.primaryCta.href}
        onClick={scrollToSection}
        className="group absolute bottom-10 flex h-10 w-6 items-start justify-center rounded-full border-2 border-foreground/50 transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <span
          aria-hidden="true"
          className="mt-2 h-2 w-1 rounded-full bg-foreground/50 animate-scroll-down transition-colors group-hover:bg-foreground"
        />
      </Link>
    </section>
  )
}
