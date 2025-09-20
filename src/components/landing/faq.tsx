'use client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/common/ui/accordion'
import { faqContent } from '@/lib/content'
import { useTranslations } from 'next-intl'

export default function FAQ() {
  const t = useTranslations('faq')
  return (
    <section
      id="faq"
      className="py-16 md:py-24 scroll-mt-20 md:scroll-mt-28"
    >
      <div className="container px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-foreground/70">{t('subtitle')}</p>
        </div>
        <Accordion
          type="single"
          collapsible
          className="w-full max-w-3xl mx-auto"
        >
          {faqContent.map((key, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                {t(`${key}.question`)}
              </AccordionTrigger>
              <AccordionContent className="text-base text-foreground/80">
                {t(`${key}.answer`)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
