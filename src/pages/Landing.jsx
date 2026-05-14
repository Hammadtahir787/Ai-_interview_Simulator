import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { HiOutlineSparkles, HiOutlineMicrophone, HiOutlineChartBar, HiOutlineDocumentText, HiOutlineArrowRight, HiOutlineCheckCircle } from 'react-icons/hi2'

const features = [
  { icon: HiOutlineSparkles, title: 'AI-Powered Questions', desc: 'Dynamic interview questions tailored to your role and experience level', color: '#7C3AED' },
  { icon: HiOutlineMicrophone, title: 'Voice Support', desc: 'Use voice input to practice speaking your answers naturally', color: '#06B6D4' },
  { icon: HiOutlineChartBar, title: 'Smart Analytics', desc: 'Track your progress with detailed performance insights', color: '#10B981' },
  { icon: HiOutlineDocumentText, title: 'Resume Analysis', desc: 'Upload your resume for personalized interview preparation', color: '#F59E0B' },
]

const stats = [
  { value: '10K+', label: 'Interviews Completed' },
  { value: '95%', label: 'Success Rate' },
  { value: '4.9★', label: 'User Rating' },
  { value: '50+', label: 'Question Categories' },
]

export default function Landing() {
  const { user } = useAuth()

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <div className="animated-bg" />

      {/* Nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(3,7,18,0.8)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1rem', fontWeight: 800, color: 'white',
          }}>AI</div>
          <span style={{ fontSize: '1.1rem', fontWeight: 700 }} className="gradient-text">InterviewAI</span>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {user ? (
            <Link to="/dashboard" className="btn-primary" style={{ padding: '10px 24px', textDecoration: 'none' }}>
              <span>Dashboard</span>
            </Link>
          ) : (
            <>
              <Link to="/login" className="btn-ghost" style={{ padding: '10px 24px', textDecoration: 'none' }}>Sign In</Link>
              <Link to="/signup" className="btn-primary" style={{ padding: '10px 24px', textDecoration: 'none' }}>
                <span>Get Started</span>
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '120px 32px 80px', position: 'relative', zIndex: 1, textAlign: 'center',
      }}>
        <div style={{ maxWidth: 800 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 20px',
              background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)',
              borderRadius: 100, marginBottom: 28, fontSize: '0.85rem', color: '#c4b5fd',
            }}>
              <HiOutlineSparkles size={16} />
              <span>AI-Powered Interview Practice</span>
            </div>

            <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.1, margin: '0 0 20px' }}>
              <span style={{ color: '#e2e8f0' }}>Ace Your Next </span>
              <span className="gradient-text">Interview</span>
              <br />
              <span style={{ color: '#e2e8f0' }}>with AI Coaching</span>
            </h1>

            <p style={{ fontSize: '1.15rem', color: '#94a3b8', maxWidth: 560, margin: '0 auto 36px', lineHeight: 1.7 }}>
              Practice with intelligent AI that adapts to your role, evaluates your responses in real-time, and provides actionable feedback to boost your confidence.
            </p>

            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to={user ? '/interview' : '/signup'}>
                <motion.button
                  className="btn-primary"
                  style={{ padding: '16px 36px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 10 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Start Practicing Free</span>
                  <HiOutlineArrowRight size={18} style={{ position: 'relative', zIndex: 1 }} />
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="stats-grid"
            style={{
              marginTop: 80,
            }}
          >
            {stats.map((stat, i) => (
              <div key={i} className="glass" style={{ padding: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 800 }} className="gradient-text">{stat.value}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: 4 }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 32px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 56 }}
          >
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 12 }} className="gradient-text">
              Everything You Need
            </h2>
            <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: 500, margin: '0 auto' }}>
              Comprehensive tools to prepare for any interview scenario
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass"
                style={{ padding: 28 }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: `${f.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 16,
                }}>
                  <f.icon size={24} style={{ color: f.color }} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 32px 100px', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass gradient-border"
          style={{
            maxWidth: 700, margin: '0 auto', padding: 48, textAlign: 'center',
            background: 'rgba(124,58,237,0.05)',
          }}
        >
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 12 }}>
            Ready to <span className="gradient-text">Level Up</span>?
          </h2>
          <p style={{ color: '#94a3b8', marginBottom: 28, fontSize: '1rem' }}>
            Join thousands of candidates who improved their interview skills with AI-powered practice.
          </p>
          <Link to={user ? '/interview' : '/signup'}>
            <motion.button
              className="btn-primary"
              style={{ padding: '16px 40px', fontSize: '1rem' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Start Free Practice</span>
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '24px 32px', borderTop: '1px solid rgba(255,255,255,0.06)',
        textAlign: 'center', position: 'relative', zIndex: 1,
      }}>
        <p style={{ color: '#475569', fontSize: '0.8rem' }}>
          © 2026 InterviewAI. Built with ❤️ for career success.
        </p>
      </footer>
    </div>
  )
}
