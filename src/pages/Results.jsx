import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ROLES, DIFFICULTIES } from '../utils/questions'
import GlassCard from '../components/ui/GlassCard'
import ScoreRing from '../components/ui/ScoreRing'
import { HiOutlineArrowRight, HiOutlineChatBubbleLeftRight, HiOutlineLightBulb, HiOutlineArrowPath, HiOutlineHome, HiOutlineTrophy } from 'react-icons/hi2'

export default function Results() {
  const navigate = useNavigate()
  const [results, setResults] = useState(null)
  const [showAnswers, setShowAnswers] = useState(false)

  useEffect(() => {
    const saved = sessionStorage.getItem('iai_results')
    if (saved) setResults(JSON.parse(saved))
    else navigate('/dashboard')
  }, [navigate])

  if (!results) return null
  const { scores, answers, role, difficulty, questionsCount, duration } = results
  const roleMeta = ROLES.find(r => r.id === role)
  const diffMeta = DIFFICULTIES.find(d => d.id === difficulty)
  const getGrade = (s) => {
    if (s >= 90) return { grade: 'A+', color: '#10B981', label: 'Outstanding' }
    if (s >= 80) return { grade: 'A', color: '#10B981', label: 'Excellent' }
    if (s >= 70) return { grade: 'B', color: '#06B6D4', label: 'Good' }
    if (s >= 60) return { grade: 'C', color: '#F59E0B', label: 'Average' }
    return { grade: 'D', color: '#EF4444', label: 'Keep Practicing' }
  }
  const grade = getGrade(scores.overall)
  const tips = [
    scores.communication < 70 && 'Structure responses with STAR method.',
    scores.confidence < 70 && 'Speak assertively, avoid filler words.',
    scores.technical < 70 && 'Deepen technical knowledge with focused study.',
    scores.overall >= 80 && 'Great job! Try advanced difficulty next.',
  ].filter(Boolean)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}>
          <HiOutlineTrophy size={48} style={{ color: grade.color }} />
        </motion.div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '8px 0' }} className="gradient-text">Interview Complete!</h1>
        <p style={{ color: '#64748b' }}>{roleMeta?.icon} {roleMeta?.title} • {diffMeta?.label} • {questionsCount} questions</p>
      </div>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <GlassCard hover={false} style={{ marginBottom: 24, textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap', alignItems: 'center' }}>
            <div>
              <ScoreRing score={scores.overall} size={160} color={grade.color} />
              <div style={{ marginTop: 12 }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: grade.color, padding: '4px 16px', borderRadius: 8, background: `${grade.color}15` }}>{grade.grade}</span>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: 8 }}>{grade.label}</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 200 }}>
              {[{ label: 'Communication', score: scores.communication, color: '#06B6D4' }, { label: 'Confidence', score: scores.confidence, color: '#10B981' }, { label: 'Technical', score: scores.technical, color: '#F59E0B' }].map(s => (
                <div key={s.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{s.label}</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: s.color }}>{s.score}%</span>
                  </div>
                  <div className="progress-bar"><motion.div className="progress-bar-fill" initial={{ width: 0 }} animate={{ width: `${s.score}%` }} transition={{ duration: 1.2, delay: 0.5 }} style={{ background: s.color }} /></div>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
        {tips.length > 0 && (
          <GlassCard hover={false} style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}><HiOutlineLightBulb size={20} style={{ color: '#F59E0B' }} /><h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>AI Tips</h2></div>
            {tips.map((t, i) => (<div key={i} style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', marginBottom: 8, fontSize: '0.85rem', color: '#94a3b8' }}>💡 {t}</div>))}
          </GlassCard>
        )}
        <GlassCard hover={false} style={{ marginBottom: 24 }}>
          <div onClick={() => setShowAnswers(!showAnswers)} style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><HiOutlineChatBubbleLeftRight size={20} style={{ color: '#7C3AED' }} /><h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>Answer Review</h2></div>
            <motion.span animate={{ rotate: showAnswers ? 90 : 0 }} style={{ color: '#64748b' }}><HiOutlineArrowRight size={18} /></motion.span>
          </div>
          {showAnswers && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {answers.map((a, i) => (<div key={i} style={{ padding: 16, borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#7C3AED' }}>Q{i + 1}</span><span style={{ fontSize: '0.8rem', fontWeight: 700, padding: '2px 10px', borderRadius: 6, background: a.evaluation.overall >= 70 ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)', color: a.evaluation.overall >= 70 ? '#10B981' : '#F59E0B' }}>{a.evaluation.overall}%</span></div>
              <p style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: 6 }}>{a.question}</p>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: 6 }}>{a.answer}</p>
              <p style={{ fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic' }}>💡 {a.evaluation.feedback}</p>
            </div>))}
          </motion.div>)}
        </GlassCard>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/interview"><motion.button className="btn-primary" style={{ padding: '14px 28px', display: 'flex', alignItems: 'center', gap: 8 }} whileHover={{ scale: 1.03 }}><HiOutlineArrowPath size={18} style={{ position: 'relative', zIndex: 1 }} /><span>Practice Again</span></motion.button></Link>
          <Link to="/dashboard"><motion.button className="btn-ghost" style={{ padding: '14px 28px', display: 'flex', alignItems: 'center', gap: 8 }} whileHover={{ scale: 1.03 }}><HiOutlineHome size={18} /><span>Dashboard</span></motion.button></Link>
        </div>
      </div>
    </motion.div>
  )
}
