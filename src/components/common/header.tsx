'use client'

import { useState, type MouseEvent as ReactMouseEvent } from 'react'
import { Link, usePathname } from '@/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { Menu, Github, Languages, FileText, Shield, Users } from 'lucide-react'
import { FaDiscord } from 'react-icons/fa6'
import { ThemeToggle } from '@/components/common/theme-toggle'
import { Button } from '@/components/common/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/common/ui/sheet'
import { navLinks, siteConfig } from '@/lib/content'
import { ThemedLogo } from '@/components/common/themed-logo'
import { scrollToSection } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/common/ui/dropdown-menu'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/common/ui/accordion'
import { useToast } from '@/hooks/use-toast'

/**
 * Displays the site header with navigation, language selection, and theming controls.
 *
 * @returns The sticky header element rendered at the top of the viewport.
 */
export default function Header() {
  const t = useTranslations()
  const locale = useLocale()
  const pathname = usePathname()
  const { toast } = useToast()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const legalLinks = [
    { href: '/team', label: t('legal.team'), icon: Users },
    { href: '/terms-of-service', label: t('legal.terms'), icon: FileText },
    { href: '/privacy-policy', label: t('legal.privacy'), icon: Shield },
  ]

  const languageOptions = [
    { locale: 'en', label: t('language.en'), icon: '🇺🇸' },
    { locale: 'zh', label: t('language.zh'), icon: '🇨🇳' },
  ]

  /**
   * Shows toast feedback when a user chooses a different language.
   *
   * @param lang - The selected language option.
   */
  function handleLanguageSwitch(lang: (typeof languageOptions)[number]) {
    toast({
      title: t('language.toast.title'),
      description: t('language.toast.description', { lang: lang.label }),
    })
  }

  /**
   * Handles closing the mobile menu after navigating to a section.
   *
   * @param event - The anchor click event triggered from the sheet menu.
   */
  function handleMobileNavigationClick(
    event: ReactMouseEvent<HTMLAnchorElement>
  ) {
    scrollToSection(event)
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 w-full max-w-screen-2xl items-center justify-between px-4">
        <div className="flex items-center gap-6 md:gap-10">
          <Link
            href="/"
            onClick={scrollToSection}
            className="flex items-center space-x-2"
          >
            <ThemedLogo
              darkSrc="/images/dark-theme-logo.webp"
              lightSrc="/images/light-theme-logo.webp"
              alt="Vibe Engineers Logo"
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <span className="hidden font-bold sm:inline-block">
              {t('siteConfig.name')}
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={scrollToSection}
                className="px-2 text-foreground/60 transition-colors hover:text-foreground/80"
              >
                {t(`navLinks.${link.key}`)}
              </Link>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger className="px-2 text-foreground/60 transition-colors hover:text-foreground/80">
                {t('legal.title')}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {legalLinks.map((item) => (
                  <DropdownMenuItem asChild key={item.href}>
                    <Link href={item.href} className="flex items-center">
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-2">
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
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={t(`language.${locale}`)}
                >
                  <Languages className="h-5 w-5" />
                  <span className="sr-only">{t(`language.${locale}`)}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languageOptions.map((lang) => (
                  <DropdownMenuItem asChild key={lang.locale}>
                    <Link
                      href={pathname}
                      locale={lang.locale as any}
                      scroll={false}
                      className="flex items-center"
                      onClick={() => handleLanguageSwitch(lang)}
                    >
                      <span className="mr-2">{lang.icon}</span>
                      {lang.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Mobile Menu */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col">
              <div className="flex-grow">
                <Link
                  href="/"
                  onClick={handleMobileNavigationClick}
                  className="flex items-center space-x-2"
                >
                  <ThemedLogo
                    darkSrc="/images/dark-theme-logo.webp"
                    lightSrc="/images/light-theme-logo.webp"
                    alt="Vibe Engineers Logo"
                    width={40}
                    height={40}
                    className="h-10 w-10"
                  />
                  <span className="font-bold">{t('siteConfig.name')}</span>
                </Link>
                <div className="mt-6 flex flex-col space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={handleMobileNavigationClick}
                      className="flex items-center gap-2 rounded-md p-2 text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
                    >
                      <link.icon className="h-4 w-4" />
                      {t(`navLinks.${link.key}`)}
                    </Link>
                  ))}
                  <Accordion type="single" collapsible>
                    <AccordionItem value="about-us" className="border-none">
                      <AccordionTrigger className="flex items-center gap-2 rounded-md p-2 text-foreground/80 transition-colors hover:bg-accent hover:text-foreground [&[data-state=open]>svg]:rotate-180">
                        {t('legal.title')}
                      </AccordionTrigger>
                      <AccordionContent className="pb-0">
                        <div className="mt-2 flex flex-col space-y-2 pl-4">
                          {legalLinks.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="flex items-center gap-2 rounded-md p-2 text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
                            >
                              <item.icon className="h-4 w-4" />
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>

              <div className="mt-auto flex items-center justify-center gap-2 border-t pt-4">
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
                <ThemeToggle />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={t(`language.${locale}`)}
                    >
                      <Languages className="h-5 w-5" />
                      <span className="sr-only">{t(`language.${locale}`)}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {languageOptions.map((lang) => (
                      <DropdownMenuItem asChild key={lang.locale}>
                        <Link
                          href={pathname}
                          locale={lang.locale as any}
                          scroll={false}
                          className="flex items-center"
                          onClick={() => handleLanguageSwitch(lang)}
                        >
                          <span className="mr-2">{lang.icon}</span>
                          {lang.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
