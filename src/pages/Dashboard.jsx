import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { generateMockHistory, ROLES } from '../utils/questions'
import GlassCard from '../components/ui/GlassCard'
import ScoreRing from '../components/ui/ScoreRing'
import { CardSkeleton } from '../components/ui/LoadingSkeleton'
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineTrophy,
  HiOutlineFire,
  HiOutlineArrowTrendingUp,
  HiOutlineArrowRight,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineExclamationTriangle,
  HiOutlineLightBulb,
} from 'react-icons/hi2'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function Dashboard() {
  const { user } = useAuth()
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('iai_history')
    const timer = setTimeout(() => {
      setHistory(saved ? JSON.parse(saved) : generateMockHistory())
      setLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const avgScore = history.length ? Math.round(history.reduce((s, h) => s + h.scores.overall, 0) / history.length) : 0
  const bestScore = history.length ? Math.max(...history.map(h => h.scores.overall)) : 0
  const totalInterviews = history.length
  const streak = user?.streak || 5

  // Weakness analysis
  const avgComm = history.length ? Math.round(history.reduce((s, h) => s + h.scores.communication, 0) / history.length) : 0
  const avgConf = history.length ? Math.round(history.reduce((s, h) => s + h.scores.confidence, 0) / history.length) : 0
  const avgTech = history.length ? Math.round(history.reduce((s, h) => s + h.scores.technical, 0) / history.length) : 0
  const weakest = [
    { name: 'Communication', score: avgComm },
    { name: 'Confidence', score: avgConf },
    { name: 'Technical', score: avgTech },
  ].sort((a, b) => a.score - b.score)

  const getRoleName = (id) => ROLES.find(r => r.id === id)?.title || id
  const getRoleIcon = (id) => ROLES.find(r => r.id === id)?.icon || '📝'

  const statCards = [
    { label: 'Total Interviews', value: totalInterviews, icon: HiOutlineChatBubbleLeftRight, color: '#7C3AED' },
    { label: 'Average Score', value: `${avgScore}%`, icon: HiOutlineTrophy, color: '#06B6D4' },
    { label: 'Best Score', value: `${bestScore}%`, icon: HiOutlineArrowTrendingUp, color: '#10B981' },
    { label: 'Day Streak', value: streak, icon: HiOutlineFire, color: '#F59E0B' },
  ]

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {/* Header */}
      <motion.div variants={itemVariants} style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 4px' }}>
          Welcome back, <span className="gradient-text">{user?.name?.split(' ')[0]}</span> 👋
        </h1>
        <p style={{ color: '#64748b', margin: 0 }}>Here's your interview performance overview</p>
      </motion.div>

      {/* Stat Cards */}
      <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 28 }}>
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
        ) : (
          statCards.map((s, i) => (
            <GlassCard key={i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0 0 8px' }}>{s.label}</p>
                  <p style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0, color: s.color }}>{s.value}</p>
                </div>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, background: `${s.color}15`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <s.icon size={22} style={{ color: s.color }} />
                </div>
              </div>
            </GlassCard>
          ))
        )}
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24 }}>
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Recent Activity */}
          <motion.div variants={itemVariants}>
            <GlassCard hover={false}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>Recent Interviews</h2>
                <Link to="/analytics" style={{ fontSize: '0.8rem', color: '#7C3AED', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                  View All <HiOutlineArrowRight size={14} />
                </Link>
              </div>

              {loading ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[1, 2, 3].map(i => <div key={i} className="skeleton" style={{ height: 64 }} />)}
                </div>
              ) : history.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 40, color: '#64748b' }}>
                  <HiOutlineChatBubbleLeftRight size={40} style={{ marginBottom: 12, opacity: 0.5 }} />
                  <p>No interviews yet. Start your first one!</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {history.slice(0, 5).map((h, i) => (
                    <motion.div
                      key={h.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '14px 16px', borderRadius: 12,
                        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <span style={{ fontSize: '1.4rem' }}>{getRoleIcon(h.role)}</span>
                        <div>
                          <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{getRoleName(h.role)}</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', gap: 12, marginTop: 2 }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                              <HiOutlineCalendar size={12} />
                              {new Date(h.date).toLocaleDateString()}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                              <HiOutlineClock size={12} />
                              {h.duration}min
                            </span>
                          </div>
                        </div>
                      </div>
                      <div style={{
                        padding: '6px 14px', borderRadius: 8, fontSize: '0.85rem', fontWeight: 700,
                        background: h.scores.overall >= 75 ? 'rgba(16,185,129,0.15)' : h.scores.overall >= 50 ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)',
                        color: h.scores.overall >= 75 ? '#10B981' : h.scores.overall >= 50 ? '#F59E0B' : '#EF4444',
                      }}>
                        {h.scores.overall}%
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </GlassCard>
          </motion.div>

          {/* Quick Start */}
          <motion.div variants={itemVariants}>
            <GlassCard hover={false}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 16px' }}>Quick Start</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {ROLES.map(r => (
                  <Link key={r.id} to={`/interview?role=${r.id}`} style={{ textDecoration: 'none' }}>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        padding: '18px 16px', borderRadius: 12,
                        background: `${r.color}08`, border: `1px solid ${r.color}20`,
                        cursor: 'pointer', transition: 'all 0.2s',
                      }}
                    >
                      <span style={{ fontSize: '1.6rem' }}>{r.icon}</span>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, marginTop: 8, color: '#e2e8f0' }}>{r.title}</div>
                      <div style={{ fontSize: '0.73rem', color: '#64748b', marginTop: 2 }}>{r.description}</div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Overall Score */}
          <motion.div variants={itemVariants}>
            <GlassCard hover={false}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 20px', textAlign: 'center' }}>Overall Score</h2>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                <ScoreRing score={avgScore} size={140} color="#7C3AED" label="Average" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                {[
                  { label: 'Comm', score: avgComm, color: '#06B6D4' },
                  { label: 'Conf', score: avgConf, color: '#10B981' },
                  { label: 'Tech', score: avgTech, color: '#F59E0B' },
                ].map(s => (
                  <div key={s.label} style={{ textAlign: 'center', padding: '10px 0' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 700, color: s.color }}>{s.score}%</div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Weakness Insights */}
          <motion.div variants={itemVariants}>
            <GlassCard hover={false}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <HiOutlineExclamationTriangle size={18} style={{ color: '#F59E0B' }} />
                <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>Weakness Insights</h2>
              </div>
              {weakest.map((w, i) => (
                <div key={w.name} style={{ marginBottom: i < weakest.length - 1 ? 14 : 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{w.name}</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: w.score >= 70 ? '#10B981' : w.score >= 50 ? '#F59E0B' : '#EF4444' }}>{w.score}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: `${w.score}%`, background: w.score >= 70 ? '#10B981' : w.score >= 50 ? 'linear-gradient(90deg, #F59E0B, #EF4444)' : '#EF4444' }} />
                  </div>
                </div>
              ))}
            </GlassCard>
          </motion.div>

          {/* Tips */}
          <motion.div variants={itemVariants}>
            <GlassCard hover={false}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <HiOutlineLightBulb size={18} style={{ color: '#06B6D4' }} />
                <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>Pro Tips</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  'Practice the STAR method for behavioral questions',
                  'Use specific numbers and metrics in your answers',
                  'Record yourself to improve delivery and pacing',
                ].map((tip, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.03)' }}>
                    <span style={{ color: '#06B6D4', fontSize: '0.8rem', fontWeight: 600, flexShrink: 0 }}>#{i + 1}</span>
                    <span style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>{tip}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          div[style*="gridTemplateColumns: '1fr 340px'"],
          div[style*="grid-template-columns: 1fr 340px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </motion.div>
  )
}
