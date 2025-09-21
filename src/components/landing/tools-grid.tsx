'use client'
import { Check } from 'lucide-react'
import { tools } from '@/lib/content'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/common/ui/card'
import { Button } from '@/components/common/ui/button'
import { Link } from '@/navigation'
import { useTranslations } from 'next-intl'
import { ThemedLogo } from '@/components/common/themed-logo'

/**
 * Showcases a curated selection of tools with descriptions and resource links.
 *
 * @returns The tools grid section of the landing page.
 */
export default function ToolsGrid() {
  const t = useTranslations('tools')
  const displayedTools = tools.filter((tool) =>
    ['vibechecks', 'vibegen', 'viberetry'].includes(tool.name)
  )

  return (
    <section
      id="tools"
      className="py-16 md:py-24 scroll-mt-16 md:scroll-mt-24"
    >
      <div className="container px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-foreground/70">{t('subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {displayedTools.map((tool) => (
            <Card
              key={tool.name}
              className="flex flex-col overflow-hidden shadow-lg transition-transform motion-safe:hover:-translate-y-2"
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-4">
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-primary/10">
                  <ThemedLogo
                    lightSrc={tool.lightImageSrc}
                    darkSrc={tool.darkImageSrc}
                    alt={`${t(`${tool.name}.name`)} logo`}
                    width={48}
                    height={48}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold">
                    {t(`${tool.name}.name`)}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between p-6 pt-0">
                <div>
                  <CardDescription className="mb-6">
                    {t(`${tool.name}.valueProp`)}
                  </CardDescription>
                  <ul className="space-y-3 text-sm text-foreground/80">
                    {t
                      .raw(`${tool.name}.bullets`)
                      .map((bullet: string, i: number) => (
                        <li key={i} className="flex items-start">
                          <Check className="mr-2 mt-1 h-4 w-4 shrink-0 text-primary" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                  </ul>
                </div>
                <Button
                  asChild
                  variant="link"
                  className="mt-6 px-0 justify-start"
                >
                  <Link
                    href={tool.learnMoreHref}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t(`${tool.name}.learnMore`)} &rarr;
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-16 text-center">
          <p className="text-lg text-foreground/70">{t('more')}</p>
        </div>
      </div>
    </section>
  )
}
