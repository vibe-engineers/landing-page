import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, test, vi, beforeEach } from 'vitest'

import MotionSection from '@/components/common/motion-section'

const { useInViewMock, motionSectionPropsMock } = vi.hoisted(() => ({
  useInViewMock: vi.fn(),
  motionSectionPropsMock: vi.fn(),
}))

vi.mock('framer-motion', () => {
  const MotionSectionComponent = React.forwardRef<HTMLDivElement, any>(
    ({ children, initial, animate, transition, ...props }, ref) => {
      motionSectionPropsMock({ initial, animate, transition, ...props })
      return (
        <section ref={ref} data-testid="motion-section" {...props}>
          {children}
        </section>
      )
    }
  )

  return {
    motion: {
      section: MotionSectionComponent,
    },
    useInView: useInViewMock,
  }
})

describe('MotionSection', () => {
  beforeEach(() => {
    useInViewMock.mockReset()
    motionSectionPropsMock.mockClear()
  })

  test('animates into view when the section becomes visible', () => {
    useInViewMock.mockReturnValue(true)

    render(
      <MotionSection delay={0.3} id="features">
        <p>Content</p>
      </MotionSection>
    )

    expect(useInViewMock).toHaveBeenCalledWith(expect.any(Object), { once: true })

    expect(motionSectionPropsMock).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'features',
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay: 0.3 },
      })
    )

    expect(screen.getByTestId('motion-section')).toBeInTheDocument()
  })

  test('keeps the section hidden until it is in view', () => {
    useInViewMock.mockReturnValue(false)

    render(
      <MotionSection>
        <p>Hidden content</p>
      </MotionSection>
    )

    expect(motionSectionPropsMock).toHaveBeenCalledWith(
      expect.objectContaining({
        animate: { opacity: 0, y: 20 },
      })
    )
  })
})
