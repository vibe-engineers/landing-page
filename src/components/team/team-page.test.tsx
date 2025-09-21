import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

vi.mock('next/image', () => ({
  default: ({ fill: _fill, ...props }: any) => {
    return <img {...props} />
  },
}))

vi.mock('@/components/common/motion-section', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="motion-wrapper">{children}</div>
  ),
}))

vi.mock('framer-motion', () => {
  return {
    motion: {
      div: React.forwardRef<HTMLDivElement, any>(
        (
          {
            children,
            initial: _initial,
            animate: _animate,
            transition: _transition,
            ...props
          },
          ref
        ) => (
          <div ref={ref} data-testid="team-card" {...props}>
            {children}
          </div>
        )
      ),
    },
  }
})

import TeamPage from '@/components/team/team-page'
import { teamMembers } from '@/lib/team'

describe('TeamPage', () => {
  test('renders all team members with their roles', () => {
    render(<TeamPage title="Our Team" subtitle="Meet the crew" />)

    const cards = screen.getAllByTestId('team-card')
    expect(cards).toHaveLength(teamMembers.length)

    teamMembers.forEach((member) => {
      expect(screen.getByText(member.name)).toBeInTheDocument()
    })

    expect(screen.getByText('Our Team')).toBeInTheDocument()
    expect(screen.getByText('Meet the crew')).toBeInTheDocument()
  })

  test('toggles the active member when tapped on touch devices', () => {
    render(<TeamPage title="Our Team" subtitle="Meet the crew" />)

    const [firstCard] = screen.getAllByTestId('team-card')
    const images = firstCard.querySelectorAll('img')
    const colorImage = images[1] as HTMLImageElement

    expect(colorImage.classList.contains('opacity-0')).toBe(true)
    expect(colorImage.classList.contains('opacity-100')).toBe(false)

    fireEvent.pointerDown(firstCard, { pointerType: 'touch' })
    expect(colorImage.classList.contains('opacity-100')).toBe(true)
    expect(colorImage.classList.contains('opacity-0')).toBe(false)

    fireEvent.pointerDown(firstCard, { pointerType: 'touch' })
    expect(colorImage.classList.contains('opacity-0')).toBe(true)
    expect(colorImage.classList.contains('opacity-100')).toBe(false)
  })

  test('ignores non-touch pointer interactions', () => {
    render(<TeamPage title="Our Team" subtitle="Meet the crew" />)

    const [firstCard] = screen.getAllByTestId('team-card')
    const images = firstCard.querySelectorAll('img')
    const colorImage = images[1] as HTMLImageElement

    fireEvent.pointerDown(firstCard, { pointerType: 'mouse' })
    expect(colorImage.classList.contains('opacity-0')).toBe(true)
    expect(colorImage.classList.contains('opacity-100')).toBe(false)
  })
})
