import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'

import LegalPage from '@/components/legal-page'

test('renders legal page with title and children', () => {
  render(
    <LegalPage title="Test Title">
      <div>Test Child</div>
    </LegalPage>
  )

  expect(screen.getByText('Test Title')).toBeInTheDocument()
  expect(screen.getByText('Test Child')).toBeInTheDocument()
})
