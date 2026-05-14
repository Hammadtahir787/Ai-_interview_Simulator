import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ROLES, DIFFICULTIES } from '../utils/questions'
import GlassCard from '../components/ui/GlassCard'
import { HiOutlineArrowRight, HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2'

export default function Interview() {
  const [searchParams] = useSearchParams()
  const preselectedRole = searchParams.get('role') || ''
  const [selectedRole, setSelectedRole] = useState(preselectedRole)
  const [selectedDiff, setSelectedDiff] = useState('')
  const [questionCount, setQuestionCount] = useState(5)
  const navigate = useNavigate()

  const canStart = selectedRole && selectedDiff

  const handleStart = () => {
    if (!canStart) return
    navigate(`/interview/session?role=${selectedRole}&difficulty=${selectedDiff}&count=${questionCount}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 4px' }}>
          <span className="gradient-text">New Interview</span>
        </h1>
        <p style={{ color: '#64748b', margin: 0 }}>Configure your interview session</p>
      </div>

      <div style={{ maxWidth: 700 }}>
        {/* Role Selection */}
        <GlassCard hover={false} style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 6px' }}>Select Role</h2>
          <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '0 0 20px' }}>Choose the position you're preparing for</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
            {ROLES.map(role => (
              <motion.div
                key={role.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedRole(role.id)}
                style={{
                  padding: '20px 18px', borderRadius: 14, cursor: 'pointer',
                  background: selectedRole === role.id ? `${role.color}15` : 'rgba(255,255,255,0.03)',
                  border: selectedRole === role.id ? `2px solid ${role.color}60` : '2px solid rgba(255,255,255,0.06)',
                  transition: 'all 0.2s',
                }}
                id={`role-${role.id}`}
              >
                <span style={{ fontSize: '2rem' }}>{role.icon}</span>
                <div style={{ fontSize: '0.95rem', fontWeight: 600, marginTop: 10 }}>{role.title}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 4 }}>{role.description}</div>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        {/* Difficulty */}
        <GlassCard hover={false} style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 6px' }}>Difficulty Level</h2>
          <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '0 0 20px' }}>Select your experience level</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {DIFFICULTIES.map(d => (
              <motion.div
                key={d.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedDiff(d.id)}
                style={{
                  padding: '20px 18px', borderRadius: 14, cursor: 'pointer', textAlign: 'center',
                  background: selectedDiff === d.id ? `${d.color}15` : 'rgba(255,255,255,0.03)',
                  border: selectedDiff === d.id ? `2px solid ${d.color}60` : '2px solid rgba(255,255,255,0.06)',
                  transition: 'all 0.2s',
                }}
                id={`diff-${d.id}`}
              >
                <div style={{ fontSize: '1rem', fontWeight: 700, color: d.color }}>{d.label}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 4 }}>{d.description}</div>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        {/* Settings */}
        <GlassCard hover={false} style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <HiOutlineAdjustmentsHorizontal size={18} style={{ color: '#7C3AED' }} />
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>Settings</h2>
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'block', marginBottom: 10 }}>
              Number of Questions: <span style={{ fontWeight: 700, color: '#7C3AED' }}>{questionCount}</span>
            </label>
            <input
              type="range"
              min="3"
              max="10"
              value={questionCount}
              onChange={e => setQuestionCount(Number(e.target.value))}
              style={{
                width: '100%', height: 6, borderRadius: 3, appearance: 'none',
                background: 'rgba(255,255,255,0.06)', outline: 'none', cursor: 'pointer',
                accentColor: '#7C3AED',
              }}
              id="question-count-slider"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#64748b', marginTop: 4 }}>
              <span>3</span>
              <span>10</span>
            </div>
          </div>
        </GlassCard>

        {/* Start Button */}
        <motion.button
          className="btn-primary"
          onClick={handleStart}
          disabled={!canStart}
          style={{
            width: '100%', padding: '16px', fontSize: '1rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            opacity: canStart ? 1 : 0.5, cursor: canStart ? 'pointer' : 'not-allowed',
          }}
          whileHover={canStart ? { scale: 1.02 } : undefined}
          whileTap={canStart ? { scale: 0.98 } : undefined}
          id="start-interview"
        >
          <span>Start Interview</span>
          <HiOutlineArrowRight size={18} style={{ position: 'relative', zIndex: 1 }} />
        </motion.button>
      </div>
    </motion.div>
  )
}
