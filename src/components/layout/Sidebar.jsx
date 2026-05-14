import React, { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import {
  HiOutlineHome,
  HiOutlineChatBubbleLeftRight,
  HiOutlineChartBarSquare,
  HiOutlineDocumentText,
  HiOutlineUserCircle,
  HiOutlineCog6Tooth,
  HiOutlineArrowRightOnRectangle,
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineShieldCheck,
  HiOutlineBars3,
  HiOutlineXMark,
} from 'react-icons/hi2'

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: HiOutlineHome },
  { path: '/interview', label: 'New Interview', icon: HiOutlineChatBubbleLeftRight },
  { path: '/analytics', label: 'Analytics', icon: HiOutlineChartBarSquare },
  { path: '/resume', label: 'Resume', icon: HiOutlineDocumentText },
  { path: '/profile', label: 'Profile', icon: HiOutlineUserCircle },
]

export default function Sidebar() {
  const { user, logout, isAdmin } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.2rem', fontWeight: 800, color: 'white',
          }}>
            AI
          </div>
          <div>
            <h1 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }} className="gradient-text">
              InterviewAI
            </h1>
            <p style={{ fontSize: '0.7rem', color: '#64748b', margin: 0 }}>AI-Powered Practice</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '16px 0', overflow: 'auto' }}>
        <div style={{ padding: '0 12px', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '0 8px' }}>
            Menu
          </span>
        </div>
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}

        {isAdmin && (
          <>
            <div style={{ padding: '16px 20px 8px' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Admin
              </span>
            </div>
            <NavLink
              to="/admin"
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              <HiOutlineShieldCheck size={20} />
              <span>Admin Panel</span>
            </NavLink>
          </>
        )}
      </nav>

      {/* Bottom section */}
      <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            width: '100%', padding: '10px 16px', background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px',
            color: '#94a3b8', cursor: 'pointer', fontSize: '0.85rem',
            marginBottom: '8px', transition: 'all 0.2s',
          }}
        >
          {isDark ? <HiOutlineSun size={18} /> : <HiOutlineMoon size={18} />}
          <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
        </button>

        {/* User info */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          padding: '12px', background: 'rgba(255,255,255,0.04)',
          borderRadius: '10px', marginBottom: '8px',
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.85rem', fontWeight: 700, color: 'white', flexShrink: 0,
          }}>
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user?.name}
            </div>
            <div style={{ fontSize: '0.7rem', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user?.email}
            </div>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            width: '100%', padding: '10px 16px', background: 'transparent',
            border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px',
            color: '#EF4444', cursor: 'pointer', fontSize: '0.85rem',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => e.target.style.background = 'rgba(239,68,68,0.1)'}
          onMouseLeave={e => e.target.style.background = 'transparent'}
        >
          <HiOutlineArrowRightOnRectangle size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        style={{
          position: 'fixed', top: 16, left: 16, zIndex: 60,
          width: 44, height: 44, borderRadius: 12,
          background: 'rgba(10,15,30,0.9)', border: '1px solid rgba(255,255,255,0.1)',
          color: '#e2e8f0', cursor: 'pointer', display: 'none',
          alignItems: 'center', justifyContent: 'center',
        }}
        className="mobile-menu-btn"
        id="mobile-menu-toggle"
      >
        {mobileOpen ? <HiOutlineXMark size={22} /> : <HiOutlineBars3 size={22} />}
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
              zIndex: 45, display: 'none',
            }}
            className="mobile-overlay"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
        <SidebarContent />
      </aside>

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: flex !important; }
          .mobile-overlay { display: block !important; }
        }
      `}</style>
    </>
  )
}
