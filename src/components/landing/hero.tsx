'use client'

import { Link } from '@/navigation'
import { Button } from '@/components/common/ui/button'
import { heroContent } from '@/lib/content'
import { Zap } from 'lucide-react'
import { ThemedLogo } from '@/components/common/themed-logo'
import { scrollToSection } from '@/lib/utils'
import { ConfettiBackground } from '@/components/landing/confetti'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

export default function Hero() {
  const t = useTranslations('hero')
  const tSite = useTranslations('siteConfig')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section
      id="hero"
      className="relative flex h-[calc(100vh-56px)] flex-col items-center justify-center pt-16 pb-20 md:pt-24 md:pb-32"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 top-0 -z-10 h-full w-full bg-background"
      >
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(128,0,128,0.2)] opacity-50 blur-[80px]"></div>
        <ConfettiBackground />
      </div>
      <div className="container px-4 text-center">
        <motion.div
          className="mx-auto flex max-w-4xl flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <ThemedLogo
              darkSrc="/images/dark-theme-logo.webp"
              lightSrc="/images/light-theme-logo.webp"
              width={150}
              height={150}
            />
          </motion.div>
          <motion.div
            className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
            variants={itemVariants}
          >
            <Zap className="mr-2 h-4 w-4" />
            {t('announcement')}
          </motion.div>
          <motion.h1
            className="font-headline text-4xl font-black tracking-tighter sm:text-6xl md:text-8xl"
            variants={itemVariants}
          >
            {tSite('name')}
          </motion.h1>
          <motion.p
            className="mt-4 font-headline text-xl font-bold tracking-tight sm:text-2xl md:text-4xl"
            variants={itemVariants}
          >
            {t('tagline')}
          </motion.p>
          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg text-foreground/80 md:text-xl"
            variants={itemVariants}
          >
            {t('subcopy')}
          </motion.p>
          <motion.div
            className="mt-10 flex flex-wrap justify-center gap-4"
            variants={itemVariants}
          >
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
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link
              href={heroContent.primaryCta.href}
              onClick={scrollToSection}
              className="group mt-10 hidden h-10 w-6 items-start justify-center rounded-full border-2 border-foreground/50 transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:flex"
            >
              <span
                aria-hidden="true"
                className="mt-2 h-2 w-1 rounded-full bg-foreground/50 animate-scroll-down transition-colors group-hover:bg-foreground"
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
