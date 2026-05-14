import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { HiOutlineEnvelope, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', position: 'relative' }}>
      <div className="animated-bg" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ width: '100%', maxWidth: 440, position: 'relative', zIndex: 1 }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16, margin: '0 auto 16px',
            background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.4rem', fontWeight: 800, color: 'white',
          }}>AI</div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 4px' }} className="gradient-text">
            Welcome Back
          </h1>
          <p style={{ color: '#64748b', margin: 0, fontSize: '0.9rem' }}>Sign in to continue your interview prep</p>
        </div>

        {/* Form */}
        <div className="glass" style={{ padding: 32 }}>
          <form onSubmit={handleSubmit}>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                style={{
                  padding: '12px 16px', borderRadius: 10, marginBottom: 20,
                  background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
                  color: '#EF4444', fontSize: '0.85rem',
                }}
              >
                {error}
              </motion.div>
            )}

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: 8, color: '#94a3b8' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <HiOutlineEnvelope size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                <input
                  type="email"
                  className="input-field"
                  style={{ paddingLeft: 42 }}
                  placeholder="alex@demo.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  id="login-email"
                />
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: 8, color: '#94a3b8' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <HiOutlineLockClosed size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                <input
                  type={showPw ? 'text' : 'password'}
                  className="input-field"
                  style={{ paddingLeft: 42, paddingRight: 42 }}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  id="login-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}
                >
                  {showPw ? <HiOutlineEyeSlash size={18} /> : <HiOutlineEye size={18} />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', padding: '14px', fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              id="login-submit"
            >
              <span>{loading ? 'Signing in...' : 'Sign In'}</span>
            </motion.button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
              Don't have an account?{' '}
              <Link to="/signup" style={{ color: '#7C3AED', textDecoration: 'none', fontWeight: 600 }}>
                Sign Up
              </Link>
            </p>
          </div>

          {/* Demo credentials */}
          <div style={{
            marginTop: 20, padding: '14px', borderRadius: 10,
            background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.15)',
          }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#c4b5fd', margin: '0 0 6px' }}>Demo Credentials</p>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0 0 2px' }}>
              User: <span style={{ color: '#e2e8f0' }}>alex@demo.com</span> / <span style={{ color: '#e2e8f0' }}>demo123</span>
            </p>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>
              Admin: <span style={{ color: '#e2e8f0' }}>admin@demo.com</span> / <span style={{ color: '#e2e8f0' }}>admin123</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
