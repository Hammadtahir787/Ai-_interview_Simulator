import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function Layout() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <div className="animated-bg" />
      <Sidebar />
      <main
        className="main-content"
        style={{
          marginLeft: 260,
          minHeight: '100vh',
          padding: '32px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Outlet />
      </main>
    </div>
  )
}
