import { render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

const { getTranslationsMock, teamPageProps } = vi.hoisted(() => {
  const translations = {
    title: 'Meet the Team',
    subtitle: 'People behind the vibes',
  }

  const translator = Object.assign(
    (key: string) => translations[key as keyof typeof translations] ?? key,
    {}
  )

  return {
    getTranslationsMock: vi.fn().mockResolvedValue(translator),
    teamPageProps: [] as Array<Record<string, unknown>>,
  }
})

vi.mock('next-intl/server', () => ({
  getTranslations: getTranslationsMock,
}))

vi.mock('@/components/common/header', () => ({
  default: () => <header data-testid="header" />,
}))

vi.mock('@/components/common/footer', () => ({
  default: () => <footer data-testid="footer" />,
}))

vi.mock('@/components/team/team-page', () => ({
  default: (props: any) => {
    teamPageProps.push(props)
    return <div data-testid="team-page">Team content</div>
  },
}))

import TeamPageRoute from '@/app/[locale]/team/page'

describe('Team page route', () => {
  test('fetches translations and renders the team page', async () => {
    teamPageProps.length = 0
    const element = await TeamPageRoute({ params: Promise.resolve({ locale: 'zh' }) })
    render(element)

    expect(getTranslationsMock).toHaveBeenCalledWith({
      locale: 'zh',
      namespace: 'teamPage',
    })

    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
    expect(screen.getByTestId('team-page')).toBeInTheDocument()

    expect(teamPageProps[0]).toMatchObject({
      title: 'Meet the Team',
      subtitle: 'People behind the vibes',
    })
  })
})