import React, { useState } from 'react'
import { motion } from 'framer-motion'
import GlassCard from '../components/ui/GlassCard'
import toast from 'react-hot-toast'
import { HiOutlineCloudArrowUp, HiOutlineDocumentText, HiOutlineSparkles, HiOutlineTrash } from 'react-icons/hi2'

const MOCK_SKILLS = {
  technical: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'REST APIs', 'TypeScript'],
  soft: ['Team Leadership', 'Communication', 'Problem Solving', 'Agile/Scrum'],
}

const PERSONALIZED_QS = [
  'Describe a complex React application you built. What state management approach did you use and why?',
  'How do you handle API error handling in a Node.js application?',
  'Walk me through your experience with SQL query optimization.',
  'Tell me about a time you led a team through a challenging project deadline.',
  'How do you approach debugging a performance issue in a web application?',
]

export default function Resume() {
  const [file, setFile] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [skills, setSkills] = useState(null)
  const [questions, setQuestions] = useState(null)
  const [dragOver, setDragOver] = useState(false)

  const handleFile = (f) => {
    if (!f) return
    if (f.type !== 'application/pdf' && !f.name.endsWith('.pdf')) {
      toast.error('Please upload a PDF file')
      return
    }
    setFile(f)
    setSkills(null)
    setQuestions(null)
    toast.success('Resume uploaded!')
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    handleFile(e.dataTransfer.files[0])
  }

  const analyze = () => {
    setAnalyzing(true)
    setTimeout(() => {
      setSkills(MOCK_SKILLS)
      setTimeout(() => {
        setQuestions(PERSONALIZED_QS)
        setAnalyzing(false)
        toast.success('Analysis complete!')
      }, 800)
    }, 1500)
  }

  const clear = () => {
    setFile(null)
    setSkills(null)
    setQuestions(null)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 4px' }} className="gradient-text">Resume Analysis</h1>
        <p style={{ color: '#64748b', margin: 0 }}>Upload your resume for personalized interview prep</p>
      </div>

      <div style={{ maxWidth: 700 }}>
        {/* Upload Area */}
        <GlassCard hover={false} style={{ marginBottom: 24 }}>
          {!file ? (
            <div
              onDragOver={e => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              style={{
                border: `2px dashed ${dragOver ? '#7C3AED' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: 14, padding: '48px 24px', textAlign: 'center',
                transition: 'all 0.3s', cursor: 'pointer',
                background: dragOver ? 'rgba(124,58,237,0.05)' : 'transparent',
              }}
              onClick={() => document.getElementById('resume-file-input').click()}
            >
              <HiOutlineCloudArrowUp size={48} style={{ color: '#7C3AED', marginBottom: 16 }} />
              <p style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 4 }}>Drop your resume here</p>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: 16 }}>or click to browse • PDF only</p>
              <input type="file" accept=".pdf" id="resume-file-input" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
              <button className="btn-ghost" style={{ padding: '10px 24px' }} onClick={e => e.stopPropagation()}>
                Browse Files
              </button>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(124,58,237,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <HiOutlineDocumentText size={22} style={{ color: '#7C3AED' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.9rem', fontWeight: 600, margin: 0 }}>{file.name}</p>
                    <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                <button onClick={clear} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}><HiOutlineTrash size={20} /></button>
              </div>
              {!skills && (
                <motion.button className="btn-primary" onClick={analyze} disabled={analyzing} style={{ width: '100%', padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }} whileHover={{ scale: 1.02 }}>
                  <HiOutlineSparkles size={18} style={{ position: 'relative', zIndex: 1 }} />
                  <span>{analyzing ? 'Analyzing...' : 'Analyze Resume'}</span>
                </motion.button>
              )}
            </div>
          )}
        </GlassCard>

        {/* Loading */}
        {analyzing && (
          <GlassCard hover={false} style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[1, 2, 3].map(i => <div key={i} className="skeleton" style={{ height: 16, width: `${90 - i * 15}%` }} />)}
            </div>
          </GlassCard>
        )}

        {/* Skills */}
        {skills && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <GlassCard hover={false} style={{ marginBottom: 24 }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 16px' }}>Extracted Skills</h2>
              <div style={{ marginBottom: 16 }}>
                <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: 8 }}>Technical Skills</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {skills.technical.map(s => (
                    <span key={s} style={{ padding: '6px 14px', borderRadius: 8, background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.2)', fontSize: '0.82rem', color: '#c4b5fd' }}>{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: 8 }}>Soft Skills</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {skills.soft.map(s => (
                    <span key={s} style={{ padding: '6px 14px', borderRadius: 8, background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.2)', fontSize: '0.82rem', color: '#67e8f9' }}>{s}</span>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Personalized Questions */}
        {questions && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <GlassCard hover={false}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 16px' }}>Personalized Questions</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {questions.map((q, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ color: '#7C3AED', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>#{i + 1}</span>
                    <span style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6 }}>{q}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
