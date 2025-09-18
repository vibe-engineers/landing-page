'use client'

import React from 'react'
import MotionSection from './motion-section'

interface LegalPageProps {
  title: string
  children: React.ReactNode
}

const LegalPage: React.FC<LegalPageProps> = ({ title, children }) => {
  return (
    <MotionSection>
      <div className="bg-background text-foreground">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl mb-12">
              {title}
            </h1>
            <div className="prose dark:prose-invert max-w-none text-muted-foreground space-y-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </MotionSection>
  )
}

export default LegalPage
