import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'

import CodeExamples from '@/components/landing/code-examples'

const mockToast = vi.fn()

vi.mock('next-intl', () => ({
  useTranslations: (namespace: string) => (key: string) =>
    `${namespace}.${key}`,
}))

vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: mockToast,
  }),
}))

vi.mock('@/lib/content', () => ({
  codeExamples: {
    vibechecks: {
      code: 'vibechecks code',
    },
    viberetry: {
      code: 'viberetry code',
    },
  },
}))

Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: vi.fn(),
  },
})

import { waitFor, within } from '@testing-library/react'

/**
 * Validates the code examples section renders localized content and supports copying snippets.
 */
async function rendersCodeExamplesWithTitleSubtitleAndTabs() {
  render(<CodeExamples />)

  expect(screen.getByText('codeExamples.title')).toBeInTheDocument()
  expect(screen.getByText('codeExamples.subtitle')).toBeInTheDocument()
  expect(screen.getByText('codeExamples.vibechecks.label')).toBeInTheDocument()
  expect(screen.getByText('codeExamples.viberetry.label')).toBeInTheDocument()
  expect(
    screen.getByText('codeExamples.vibechecks.description')
  ).toBeInTheDocument()
  expect(screen.getByText('vibechecks code')).toBeInTheDocument()

  // Click on the second tab
  await userEvent.click(screen.getByText('codeExamples.viberetry.label'))

  await waitFor(async () => {
    const viberetryTab = await screen.findByText(
      'codeExamples.viberetry.description'
    )
    const viberetryTabContent = viberetryTab.closest(
      '[role="tabpanel"]'
    ) as HTMLElement
    expect(viberetryTabContent).toBeInTheDocument()
    expect(
      within(viberetryTabContent).getByText('viberetry code')
    ).toBeInTheDocument()

    // Click on the copy button
    const copyButton =
      within(viberetryTabContent).getByText('codeExamples.copy')
    await userEvent.click(copyButton)
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('viberetry code')
    expect(mockToast).toHaveBeenCalled()
  })
}

test(
  'renders code examples with title, subtitle, and tabs',
  rendersCodeExamplesWithTitleSubtitleAndTabs
)
