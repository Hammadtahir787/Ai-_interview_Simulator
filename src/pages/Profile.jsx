import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import GlassCard from '../components/ui/GlassCard'
import toast from 'react-hot-toast'
import { HiOutlineUserCircle, HiOutlineEnvelope, HiOutlinePencil, HiOutlineCalendar, HiOutlineTrophy } from 'react-icons/hi2'

export default function Profile() {
  const { user, updateProfile } = useAuth()
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')

  const handleSave = () => {
    if (!name.trim() || !email.trim()) { toast.error('Fields cannot be empty'); return }
    updateProfile({ name: name.trim(), email: email.trim() })
    setEditing(false)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 4px' }} className="gradient-text">Profile</h1>
        <p style={{ color: '#64748b', margin: 0 }}>Manage your account settings</p>
      </div>

      <div style={{ maxWidth: 600 }}>
        <GlassCard hover={false} style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28 }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.8rem', fontWeight: 800, color: 'white',
            }}>
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>
            <div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, margin: '0 0 4px' }}>{user?.name}</h2>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>{user?.email}</p>
              <span style={{
                display: 'inline-block', marginTop: 6, padding: '3px 10px', borderRadius: 6,
                background: user?.role === 'admin' ? 'rgba(124,58,237,0.15)' : 'rgba(6,182,212,0.15)',
                color: user?.role === 'admin' ? '#c4b5fd' : '#67e8f9', fontSize: '0.75rem', fontWeight: 600,
              }}>{user?.role === 'admin' ? 'Admin' : 'Member'}</span>
            </div>
          </div>

          {!editing ? (
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
                {[
                  { icon: HiOutlineUserCircle, label: 'Name', value: user?.name },
                  { icon: HiOutlineEnvelope, label: 'Email', value: user?.email },
                  { icon: HiOutlineCalendar, label: 'Joined', value: user?.joinedAt || 'N/A' },
                  { icon: HiOutlineTrophy, label: 'Interviews', value: user?.interviews || 0 },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.03)' }}>
                    <item.icon size={18} style={{ color: '#7C3AED', flexShrink: 0 }} />
                    <div>
                      <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>{item.label}</p>
                      <p style={{ fontSize: '0.9rem', fontWeight: 500, margin: 0 }}>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <motion.button className="btn-ghost" onClick={() => setEditing(true)} style={{ display: 'flex', alignItems: 'center', gap: 8 }} whileHover={{ scale: 1.02 }}>
                <HiOutlinePencil size={16} /> Edit Profile
              </motion.button>
            </div>
          ) : (
            <div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'block', marginBottom: 6 }}>Name</label>
                <input className="input-field" value={name} onChange={e => setName(e.target.value)} id="profile-name" />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'block', marginBottom: 6 }}>Email</label>
                <input className="input-field" value={email} onChange={e => setEmail(e.target.value)} id="profile-email" />
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <motion.button className="btn-primary" onClick={handleSave} whileHover={{ scale: 1.02 }}><span>Save</span></motion.button>
                <button className="btn-ghost" onClick={() => { setEditing(false); setName(user?.name); setEmail(user?.email) }}>Cancel</button>
              </div>
            </div>
          )}
        </GlassCard>
      </div>
    </motion.div>
  )
}
