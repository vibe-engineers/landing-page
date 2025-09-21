'use client'

import Image from 'next/image'
import { FC, PointerEvent, useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { teamMembers } from '@/lib/team'
import MotionSection from '@/components/common/motion-section'
import { cn } from '@/lib/utils'

/**
 * Props supplied to the team page component.
 */
interface TeamPageProps {
  title: string
  subtitle: string
}

/**
 * Renders the team page highlighting members with animated portraits.
 *
 * @param props - The localized title and subtitle for the page.
 * @returns The team showcase section.
 */
const TeamPage: FC<TeamPageProps> = ({ title, subtitle }) => {
  const [activeMemberIndex, setActiveMemberIndex] = useState<number | null>(
    null
  )

  /**
   * Toggles the active member when interacting via touch or pen input.
   *
   * @param index - The index of the team member being interacted with.
   * @returns A pointer event handler that toggles the member state.
   */
  const handleTouchToggle = useCallback(
    (index: number) => (event: PointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== 'touch' && event.pointerType !== 'pen') {
        return
      }

      setActiveMemberIndex((current) => (current === index ? null : index))
    },
    []
  )

  return (
    <MotionSection>
      <div className="bg-background text-foreground">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl mb-4 text-center">
              {title}
            </h1>
            <p className="text-xl text-foreground/80 text-center mb-28">
              {subtitle}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  className="text-center group"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onPointerDown={handleTouchToggle(index)}
                >
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <Image
                      src={member.avatarSketch}
                      alt={`${member.name} portrait illustration`}
                      fill
                      sizes="8rem"
                      className={cn(
                        'rounded-full object-cover shadow-lg transition-opacity duration-500 ease-out group-hover:opacity-0',
                        activeMemberIndex === index && 'opacity-0'
                      )}
                    />
                    <Image
                      src={member.avatar}
                      alt=""
                      aria-hidden="true"
                      fill
                      sizes="8rem"
                      className={cn(
                        'rounded-full object-cover shadow-lg opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100',
                        activeMemberIndex === index && 'opacity-100'
                      )}
                    />
                  </div>
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-foreground/70">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MotionSection>
  )
}

export default TeamPage
