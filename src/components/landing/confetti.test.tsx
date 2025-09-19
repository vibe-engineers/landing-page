import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'

import { ConfettiBackground } from '@/components/landing/confetti'

vi.spyOn(Math, 'random').mockReturnValue(0.5)

test('renders confetti background with pieces', () => {
  const { container } = render(<ConfettiBackground />)

  const confettiPieces = container.querySelectorAll(
    '.motion-safe\\:animate-confetti'
  )
  expect(confettiPieces).toHaveLength(20)

  confettiPieces.forEach((piece) => {
    expect(piece).toHaveStyle({
      left: '50%',
      top: '50%',
      width: '10px',
      height: '10px',
      opacity: '0',
      animationDelay: '0.05s',
      animationDuration: '25s',
      '--x': '0px',
      '--y': '0px',
    })
  })
})
