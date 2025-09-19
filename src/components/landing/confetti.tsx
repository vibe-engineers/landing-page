'use client'

import { useEffect, useState, type CSSProperties } from 'react'

interface Piece {
  left: number
  top: number
  width: number
  height: number
  delay: number
  duration: number
  opacity: number
  x: number
  y: number
}

export function ConfettiBackground() {
  const [pieces, setPieces] = useState<Piece[]>([])

  useEffect(() => {
    const pieces = Array.from({ length: 20 }, () => {
      const size = Math.random() * 8 + 6 // small squares (6–14px)
      return {
        left: Math.random() * 100,
        top: Math.random() * 100, // spread from top to bottom
        width: size, // square
        height: size, // square
        delay: Math.random() * 0.1,
        duration: Math.random() * 10 + 20,
        opacity: 0,
        x: Math.random() * 200 - 100, // bigger horizontal drift
        y: Math.random() * 200 - 100, // bigger vertical drift
      }
    })
    setPieces(pieces)
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {pieces.map((p, i) => (
        <span
          key={i}
          className="absolute bg-purple-500 motion-safe:animate-confetti"
          style={
            {
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.width}px`,
              height: `${p.height}px`,
              opacity: p.opacity,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              '--x': `${p.x}px`,
              '--y': `${p.y}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}
