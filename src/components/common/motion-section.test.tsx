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
  MotionSectionComponent.displayName = 'MotionSectionComponentMock'

  return {
    motion: {
      section: MotionSectionComponent,
    },
    useInView: useInViewMock,
  }
})

/**
 * Resets spies to ensure tests do not leak state.
 */
function resetMotionSectionMocks() {
  useInViewMock.mockReset()
  motionSectionPropsMock.mockClear()
}

/**
 * Verifies the motion section animates when the element becomes visible.
 */
function animatesIntoViewWhenTheSectionBecomesVisible() {
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
}

/**
 * Confirms the section stays hidden until it is in view.
 */
function keepsTheSectionHiddenUntilItIsInView() {
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
}

describe('MotionSection', () => {
  beforeEach(resetMotionSectionMocks)

  test(
    'animates into view when the section becomes visible',
    animatesIntoViewWhenTheSectionBecomesVisible
  )

  test('keeps the section hidden until it is in view', keepsTheSectionHiddenUntilItIsInView)
})
