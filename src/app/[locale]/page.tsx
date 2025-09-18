import Header from '@/components/header'
import Hero from '@/components/hero'
import ToolsGrid from '@/components/tools-grid'
import Philosophy from '@/components/philosophy'
import CodeExamples from '@/components/code-examples'
import CallToAction from '@/components/call-to-action'
import FAQ from '@/components/faq'
import Footer from '@/components/footer'
import MotionSection from '@/components/motion-section'

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }]
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Header />
      <main className="flex w-full flex-1 flex-col items-center">
        <MotionSection>
        <Hero />
        </MotionSection>
        <MotionSection>
          <ToolsGrid />
        </MotionSection>
        <MotionSection>
          <Philosophy />
        </MotionSection>
        <MotionSection>
          <CodeExamples />
        </MotionSection>
        <MotionSection>
          <FAQ />
        </MotionSection>
        <MotionSection>
          <CallToAction />
        </MotionSection>
      </main>
      <Footer />
    </div>
  )
}
