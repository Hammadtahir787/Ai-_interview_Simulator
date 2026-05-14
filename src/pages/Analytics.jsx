import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { generateMockHistory, ROLES } from '../utils/questions'
import GlassCard from '../components/ui/GlassCard'
import { HiOutlineChartBarSquare, HiOutlineArrowTrendingUp } from 'react-icons/hi2'

const COLORS = ['#7C3AED', '#06B6D4', '#10B981', '#F59E0B']

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: 'rgba(10,15,30,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 14px', backdropFilter: 'blur(10px)' }}>
      <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '0 0 4px' }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ fontSize: '0.85rem', color: p.color, margin: 0, fontWeight: 600 }}>{p.name}: {p.value}%</p>
      ))}
    </div>
  )
}

export default function Analytics() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('iai_history')
    setTimeout(() => {
      setHistory(saved ? JSON.parse(saved) : generateMockHistory())
      setLoading(false)
    }, 600)
  }, [])

  // Performance trend data
  const trendData = [...history].reverse().map((h, i) => ({
    name: `#${i + 1}`,
    Overall: h.scores.overall,
    Communication: h.scores.communication,
    Technical: h.scores.technical,
  }))

  // Role distribution
  const roleDist = ROLES.map(r => ({
    name: r.title,
    value: history.filter(h => h.role === r.id).length,
    icon: r.icon,
  })).filter(r => r.value > 0)

  // Score breakdown
  const avgScores = history.length ? [
    { name: 'Communication', score: Math.round(history.reduce((s, h) => s + h.scores.communication, 0) / history.length), color: '#06B6D4' },
    { name: 'Confidence', score: Math.round(history.reduce((s, h) => s + h.scores.confidence, 0) / history.length), color: '#10B981' },
    { name: 'Technical', score: Math.round(history.reduce((s, h) => s + h.scores.technical, 0) / history.length), color: '#F59E0B' },
    { name: 'Overall', score: Math.round(history.reduce((s, h) => s + h.scores.overall, 0) / history.length), color: '#7C3AED' },
  ] : []

  if (loading) {
    return (
      <div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 24 }} className="gradient-text">Analytics</h1>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {[1, 2, 3, 4].map(i => <div key={i} className="glass" style={{ padding: 24, height: 300 }}><div className="skeleton" style={{ height: '100%' }} /></div>)}
        </div>
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 4px' }} className="gradient-text">Analytics</h1>
        <p style={{ color: '#64748b', margin: 0 }}>Track your interview performance over time</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: 20 }}>
        {/* Performance Trend */}
        <GlassCard hover={false}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <HiOutlineArrowTrendingUp size={20} style={{ color: '#7C3AED' }} />
            <h2 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>Performance Trend</h2>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="gOverall" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#7C3AED" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} />
              <YAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="Overall" stroke="#7C3AED" fill="url(#gOverall)" strokeWidth={2} />
              <Area type="monotone" dataKey="Communication" stroke="#06B6D4" fill="none" strokeWidth={1.5} strokeDasharray="4 4" />
              <Area type="monotone" dataKey="Technical" stroke="#F59E0B" fill="none" strokeWidth={1.5} strokeDasharray="4 4" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Score Breakdown */}
        <GlassCard hover={false}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <HiOutlineChartBarSquare size={20} style={{ color: '#06B6D4' }} />
            <h2 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>Average Scores</h2>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={avgScores} barSize={40}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} />
              <YAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="score" name="Score" radius={[6, 6, 0, 0]}>
                {avgScores.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Role Distribution */}
        <GlassCard hover={false}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 20px' }}>Interview by Role</h2>
          {roleDist.length > 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <ResponsiveContainer width="50%" height={200}>
                <PieChart>
                  <Pie data={roleDist} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" stroke="none">
                    {roleDist.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {roleDist.map((r, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 10, height: 10, borderRadius: 3, background: COLORS[i % COLORS.length] }} />
                    <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>{r.icon} {r.name} ({r.value})</span>
                  </div>
                ))}
              </div>
            </div>
          ) : <p style={{ color: '#64748b', textAlign: 'center', padding: 40 }}>No data yet</p>}
        </GlassCard>

        {/* Role-wise Improvement */}
        <GlassCard hover={false}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 20px' }}>Role-wise Performance</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {ROLES.map(r => {
              const roleHistory = history.filter(h => h.role === r.id)
              const avg = roleHistory.length ? Math.round(roleHistory.reduce((s, h) => s + h.scores.overall, 0) / roleHistory.length) : 0
              return (
                <div key={r.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{r.icon} {r.title}</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: r.color }}>{avg}%</span>
                  </div>
                  <div className="progress-bar">
                    <motion.div className="progress-bar-fill" initial={{ width: 0 }} animate={{ width: `${avg}%` }} transition={{ duration: 1, delay: 0.3 }} style={{ background: r.color }} />
                  </div>
                </div>
              )
            })}
          </div>
        </GlassCard>
      </div>
    </motion.div>
  )
}
