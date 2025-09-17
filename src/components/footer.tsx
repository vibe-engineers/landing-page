'use client'

import { Link } from '@/navigation'
import { useTranslations } from 'next-intl'
import { siteConfig } from '@/lib/content'
import { Button } from './ui/button'
import { Logo } from '@/components/logo'
import { Github } from 'lucide-react'
import { FaDiscord } from 'react-icons/fa6'
import { scrollToSection } from '@/lib/utils'

const currentYear = new Date().getFullYear()

const footerNav = {
  about: {
    links: [
      { key: 'team', href: '/team' },
      { key: 'sponsors', href: '#' },
    ],
  },
  contribute: {
    links: [
      { key: 'sponsor', href: '#' },
      { key: 'contributions', href: '#' },
    ],
  },
  legal: {
    links: [
      { key: 'terms', href: '/terms-of-service' },
      { key: 'privacy', href: '/privacy-policy' },
    ],
  },
}

export default function Footer() {
  const t = useTranslations()

  return (
    <footer className="w-full border-t border-border/40 bg-background/95 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link
              href="/"
              className="flex items-center space-x-2"
              onClick={scrollToSection}
            >
              <Logo width={32} height={32} />
              <span className="font-bold text-lg">{t('siteConfig.name')}</span>
            </Link>
            <div className="mt-4 flex space-x-2">
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="ghost" size="icon" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </Button>
              </Link>
              <Link
                href={siteConfig.links.discord}
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="ghost" size="icon" aria-label="Discord">
                  <FaDiscord className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold">{t('footer.nav.about.title')}</h3>
              <ul className="mt-4 space-y-2">
                {footerNav.about.links.map((link) => (
                  <li key={link.key}>
                    <Link
                      href={link.href}
                      className="text-foreground/70 hover:text-foreground"
                    >
                      {t(`footer.nav.about.links.${link.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">
                {t('footer.nav.contribute.title')}
              </h3>
              <ul className="mt-4 space-y-2">
                {footerNav.contribute.links.map((link) => (
                  <li key={link.key}>
                    <Link
                      href={link.href}
                      className="text-foreground/70 hover:text-foreground"
                    >
                      {t(`footer.nav.contribute.links.${link.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">{t('footer.nav.legal.title')}</h3>
              <ul className="mt-4 space-y-2">
                {footerNav.legal.links.map((link) => (
                  <li key={link.key}>
                    <Link
                      href={link.href}
                      className="text-foreground/70 hover:text-foreground"
                    >
                      {t(`footer.nav.legal.links.${link.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border/40 pt-8 text-center text-foreground/70">
          <p>
            &copy; {currentYear} {t('siteConfig.name')}. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}
