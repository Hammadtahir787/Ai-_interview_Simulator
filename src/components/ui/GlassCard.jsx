import React from 'react'
import { motion } from 'framer-motion'

export default function GlassCard({ children, className = '', hover = true, gradient = false, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className={`glass ${gradient ? 'gradient-border' : ''} ${className}`}
      style={{ padding: '24px' }}
      whileHover={hover ? { scale: 1.01, transition: { duration: 0.2 } } : undefined}
      {...props}
    >
      {children}
    </motion.div>
  )
}
