import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'

import ToolsGrid from '@/components/tools-grid'

vi.mock('next-intl', () => ({
  useTranslations: (namespace: string) => {
    const t = (key: string) => `${namespace}.${key}`
    t.raw = (key: string) => {
      if (key.endsWith('.bullets')) {
        return ['bullet 1', 'bullet 2']
      }
      return []
    }
    return t
  },
}))

vi.mock('@/lib/content', () => ({
  tools: [
    {
      name: 'vibechecks',
      icon: () => <div />,
      learnMoreHref: '#',
    },
    {
      name: 'viberetry',
      icon: () => <div />,
      learnMoreHref: '#',
    },
    {
      name: 'vibegen',
      icon: () => <div />,
      learnMoreHref: '#',
    },
  ],
}))

vi.mock('@/navigation', () => ({
  Link: (props: any) => <a {...props} />,
}))

test('renders tools grid with title, subtitle, and tools', () => {
  render(<ToolsGrid />)

  expect(screen.getByText('tools.title')).toBeInTheDocument()
  expect(screen.getByText('tools.subtitle')).toBeInTheDocument()
  expect(screen.getByText('tools.vibechecks.name')).toBeInTheDocument()
  expect(screen.getByText('tools.viberetry.name')).toBeInTheDocument()
  expect(screen.getByText('tools.vibegen.name')).toBeInTheDocument()
  expect(screen.getByText('tools.more')).toBeInTheDocument()
})
