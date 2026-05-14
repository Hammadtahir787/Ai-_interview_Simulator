import React from 'react'

export default function ScoreRing({ score, size = 120, strokeWidth = 8, color = '#7C3AED', label = '' }) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="score-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)', filter: `drop-shadow(0 0 6px ${color}40)` }}
        />
      </svg>
      <div className="value" style={{ flexDirection: 'column' }}>
        <span style={{ fontSize: size * 0.22, fontWeight: 700, color }}>{Math.round(score)}%</span>
        {label && <span style={{ fontSize: size * 0.1, color: '#94a3b8', marginTop: 2 }}>{label}</span>}
      </div>
    </div>
  )
}
