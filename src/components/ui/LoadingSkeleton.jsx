import React from 'react'

export default function LoadingSkeleton({ lines = 3, className = '' }) {
  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="skeleton"
          style={{
            height: i === 0 ? '24px' : '16px',
            width: i === 0 ? '60%' : i === lines - 1 ? '40%' : '85%',
          }}
        />
      ))}
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="glass" style={{ padding: '24px' }}>
      <div className="skeleton" style={{ height: '20px', width: '40%', marginBottom: '16px' }} />
      <div className="skeleton" style={{ height: '14px', width: '90%', marginBottom: '8px' }} />
      <div className="skeleton" style={{ height: '14px', width: '70%', marginBottom: '16px' }} />
      <div className="skeleton" style={{ height: '36px', width: '120px', borderRadius: '8px' }} />
    </div>
  )
}
