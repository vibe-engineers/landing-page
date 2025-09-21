import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

vi.mock('next/image', () => ({
  default: ({ fill: _fill, alt = '', ...rest }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt} {...rest} />
  },
}))

vi.mock('@/components/common/motion-section', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="motion-wrapper">{children}</div>
  ),
}))

vi.mock('framer-motion', () => {
  const TeamCardMock = React.forwardRef<HTMLDivElement, any>(
    (
      { children, initial: _initial, animate: _animate, transition: _transition, ...props },
      ref
    ) => (
      // eslint-disable-next-line @next/next/no-img-element
      <div ref={ref} data-testid="team-card" {...props}>
        {children}
      </div>
    )
  )
  TeamCardMock.displayName = 'TeamCardMock'

  return {
    motion: {
      div: TeamCardMock,
    },
  }
})

import TeamPage from '@/components/team/team-page'
import { teamMembers } from '@/lib/team'

/**
 * Verifies all team members render with their details.
 */
function rendersAllTeamMembersWithTheirRoles() {
  render(<TeamPage title="Our Team" subtitle="Meet the crew" />)

  const cards = screen.getAllByTestId('team-card')
  expect(cards).toHaveLength(teamMembers.length)

  teamMembers.forEach((member) => {
    expect(screen.getByText(member.name)).toBeInTheDocument()
  })

  expect(screen.getByText('Our Team')).toBeInTheDocument()
  expect(screen.getByText('Meet the crew')).toBeInTheDocument()
}

/**
 * Ensures touch interactions toggle the active member portrait state.
 */
function togglesTheActiveMemberWhenTappedOnTouchDevices() {
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
}

/**
 * Confirms mouse interactions do not toggle the portrait state.
 */
function ignoresNonTouchPointerInteractions() {
  render(<TeamPage title="Our Team" subtitle="Meet the crew" />)

  const [firstCard] = screen.getAllByTestId('team-card')
  const images = firstCard.querySelectorAll('img')
  const colorImage = images[1] as HTMLImageElement

  fireEvent.pointerDown(firstCard, { pointerType: 'mouse' })
  expect(colorImage.classList.contains('opacity-0')).toBe(true)
  expect(colorImage.classList.contains('opacity-100')).toBe(false)
}

describe('TeamPage', () => {
  test('renders all team members with their roles', rendersAllTeamMembersWithTheirRoles)

  test(
    'toggles the active member when tapped on touch devices',
    togglesTheActiveMemberWhenTappedOnTouchDevices
  )

  test('ignores non-touch pointer interactions', ignoresNonTouchPointerInteractions)
})
