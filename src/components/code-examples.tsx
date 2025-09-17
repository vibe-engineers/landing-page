'use client'

import { useState } from 'react'
import { Clipboard, Check } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { codeExamples } from '@/lib/content'
import { Button } from './ui/button'
import { useToast } from '@/hooks/use-toast'
import { useTranslations } from 'next-intl'

export default function CodeExamples() {
  const t = useTranslations('codeExamples')
  const { toast } = useToast()
  const [copied, setCopied] = useState<Record<string, boolean>>({})

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopied({ ...copied, [key]: true })
    toast({
      title: t('copied.title'),
      description: t('copied.description', { key }),
    })
    setTimeout(() => setCopied({ ...copied, [key]: false }), 2000)
  }

  return (
    <section id="examples" className="py-16 md:py-24">
      <div className="container px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-foreground/70">{t('subtitle')}</p>
        </div>
        <Tabs defaultValue="vibechecks" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3">
            {Object.keys(codeExamples).map((key) => (
              <TabsTrigger key={key} value={key}>
                {t(`${key}.label`)}
              </TabsTrigger>
            ))}
          </TabsList>
          {Object.entries(codeExamples).map(([key, example]) => (
            <TabsContent key={key} value={key}>
              <div className="mt-4 w-full rounded-lg bg-gray-900 text-sm font-code dark:bg-black">
                <div className="px-4 py-2 text-gray-400 text-xs">
                  {t(`${key}.description`)}
                </div>
                <div className="relative p-4 pt-0">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-2 top-2 h-7 w-7 text-gray-400 hover:bg-gray-700 hover:text-white"
                    onClick={() => handleCopy(key, example.code)}
                  >
                    {copied[key] ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Clipboard className="h-4 w-4" />
                    )}
                    <span className="sr-only">{t('copy')}</span>
                  </Button>
                  <pre className="h-64 w-full overflow-auto rounded-b-lg bg-gray-900 dark:bg-black p-4 text-white whitespace-pre-wrap">
                    <code>{example.code}</code>
                  </pre>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
