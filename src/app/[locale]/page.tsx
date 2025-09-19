import Header from '@/components/common/header'
import Hero from '@/components/landing/hero'
import ToolsGrid from '@/components/landing/tools-grid'
import Philosophy from '@/components/landing/philosophy'
import CodeExamples from '@/components/landing/code-examples'
import CallToAction from '@/components/landing/call-to-action'
import FAQ from '@/components/landing/faq'
import Footer from '@/components/common/footer'
import MotionSection from '@/components/common/motion-section'

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
