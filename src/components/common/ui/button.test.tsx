import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'

import { Button } from '@/components/common/ui/button'

/**
 * Confirms the button renders with its provided text content.
 */
function rendersButtonWithCorrectText() {
  render(<Button>Click me</Button>)
  expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
}

/**
 * Ensures the button renders its child component when using the asChild prop.
 */
function rendersAsAChildComponentWhenAsChildIsTrue() {
  render(
    <Button asChild>
      <a href="https://example.com">Link</a>
    </Button>
  )
  expect(screen.getByRole('link', { name: 'Link' })).toBeInTheDocument()
}

test('renders button with correct text', rendersButtonWithCorrectText)

test(
  'renders as a child component when asChild is true',
  rendersAsAChildComponentWhenAsChildIsTrue
)
