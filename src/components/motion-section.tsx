'use client'

import { FC, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface MotionSectionProps {
  children: React.ReactNode
  delay?: number
  id?: string
}

const MotionSection: FC<MotionSectionProps> = ({
  children,
  delay = 0.15,
  id,
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
      transition={{ duration: 0.5, delay }}
      className="py-16 md:py-24"
    >
      {children}
    </motion.section>
  )
}

export default MotionSection
