'use client'

import { FC, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface MotionSectionProps {
  children: React.ReactNode
  delay?: number
  id?: string
}

/**
 * Animates content into view with a fade and slide effect once it enters the viewport.
 *
 * @param props - The section configuration including children, delay, and optional id.
 * @returns An animated motion section element.
 */
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
    >
      {children}
    </motion.section>
  )
}

export default MotionSection
