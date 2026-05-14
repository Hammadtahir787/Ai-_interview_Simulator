import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import GlassCard from '../components/ui/GlassCard'
import { HiOutlineUsers, HiOutlineChatBubbleLeftRight, HiOutlineChartBar, HiOutlineMagnifyingGlass, HiOutlineTrash, HiOutlineShieldCheck } from 'react-icons/hi2'

export default function Admin() {
  const { allUsers, isAdmin, deleteUser, user: currentUser } = useAuth()
  const [search, setSearch] = useState('')

  if (!isAdmin) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', textAlign: 'center' }}>
        <div>
          <HiOutlineShieldCheck size={48} style={{ color: '#EF4444', marginBottom: 16 }} />
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Access Denied</h2>
          <p style={{ color: '#64748b' }}>You need admin privileges to view this page.</p>
        </div>
      </div>
    )
  }

  const filteredUsers = allUsers.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  const stats = [
    { label: 'Total Users', value: allUsers.length, icon: HiOutlineUsers, color: '#7C3AED' },
    { label: 'Total Interviews', value: allUsers.reduce((s, u) => s + (u.interviews || 0), 0), icon: HiOutlineChatBubbleLeftRight, color: '#06B6D4' },
    { label: 'Avg Score', value: `${allUsers.length ? Math.round(allUsers.reduce((s, u) => s + (u.avgScore || 0), 0) / allUsers.length) : 0}%`, icon: HiOutlineChartBar, color: '#10B981' },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 4px' }} className="gradient-text">Admin Panel</h1>
        <p style={{ color: '#64748b', margin: 0 }}>Manage users and monitor platform usage</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
        {stats.map((s, i) => (
          <GlassCard key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0 0 6px' }}>{s.label}</p>
                <p style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0, color: s.color }}>{s.value}</p>
              </div>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <s.icon size={20} style={{ color: s.color }} />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* User Management */}
      <GlassCard hover={false}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>User Management</h2>
          <div style={{ position: 'relative' }}>
            <HiOutlineMagnifyingGlass size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
            <input
              className="input-field"
              style={{ paddingLeft: 36, width: 240, padding: '10px 14px 10px 36px' }}
              placeholder="Search users..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              id="admin-search"
            />
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['User', 'Email', 'Role', 'Interviews', 'Avg Score', 'Joined', 'Actions'].map(h => (
                  <th key={h} style={{ textAlign: h === 'Actions' ? 'center' : 'left', padding: '10px 14px', fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(u => (
                <tr key={u.id} style={{ transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '12px 14px', fontSize: '0.9rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: 'white', flexShrink: 0 }}>
                        {u.name.charAt(0)}
                      </div>
                      {u.name}
                    </div>
                  </td>
                  <td style={{ padding: '12px 14px', fontSize: '0.85rem', color: '#94a3b8' }}>{u.email}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ padding: '3px 10px', borderRadius: 6, fontSize: '0.75rem', fontWeight: 600, background: u.role === 'admin' ? 'rgba(124,58,237,0.15)' : 'rgba(6,182,212,0.15)', color: u.role === 'admin' ? '#c4b5fd' : '#67e8f9' }}>
                      {u.role}
                    </span>
                  </td>
                  <td style={{ padding: '12px 14px', fontSize: '0.85rem' }}>{u.interviews || 0}</td>
                  <td style={{ padding: '12px 14px', fontSize: '0.85rem', fontWeight: 600, color: (u.avgScore || 0) >= 70 ? '#10B981' : '#F59E0B' }}>{u.avgScore || 0}%</td>
                  <td style={{ padding: '12px 14px', fontSize: '0.8rem', color: '#64748b' }}>{u.joinedAt || 'N/A'}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                     {u.id !== currentUser?.id && (
                       <button
                         onClick={() => deleteUser(u.id)}
                         style={{
                           background: 'rgba(239,68,68,0.1)', border: 'none', borderRadius: '8px',
                           padding: '8px', color: '#EF4444', cursor: 'pointer', transition: 'all 0.2s',
                           display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                         }}
                         onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.2)'}
                         onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
                         title="Remove User"
                       >
                         <HiOutlineTrash size={16} />
                       </button>
                     )}
                   </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </motion.div>
  )
}
