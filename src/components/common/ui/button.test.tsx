import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'

import { Button } from '@/components/common/ui/button'

test('renders button with correct text', () => {
  render(<Button>Click me</Button>)
  expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
})

test('renders as a child component when asChild is true', () => {
  render(
    <Button asChild>
      <a href="/">Link</a>
    </Button>
  )
  expect(screen.getByRole('link', { name: 'Link' })).toBeInTheDocument()
})
