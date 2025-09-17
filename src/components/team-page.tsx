'use client'

import { FC } from 'react'
import { motion } from 'framer-motion'
import { teamMembers } from '@/lib/team'

interface TeamPageProps {
  title: string
  subtitle: string
}

const TeamPage: FC<TeamPageProps> = ({ title, subtitle }) => {
  return (
    <div className="container mx-auto px-4 py-24">
      <motion.h1
        className="text-4xl font-bold text-center mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h1>
      <motion.p
        className="text-xl text-foreground/80 text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {subtitle}
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <img
              src={member.avatar}
              alt={member.name}
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold">{member.name}</h3>
            <p className="text-foreground/70">{member.role}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default TeamPage
