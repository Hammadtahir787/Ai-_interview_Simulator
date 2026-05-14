import React, { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

// Demo user data for the simulator
const DEMO_USERS = [
  { id: '1', name: 'Alex Johnson', email: 'alex@demo.com', password: 'demo123', role: 'user', avatar: null,
    interviews: 12, avgScore: 78, streak: 5, joinedAt: '2026-01-15' },
  { id: '2', name: 'Admin User', email: 'admin@demo.com', password: 'admin123', role: 'admin', avatar: null,
    interviews: 0, avgScore: 0, streak: 0, joinedAt: '2025-12-01' },
  { id: '3', name: 'Hammadtahir787', email: 'hammadsir@admin.com', password: 'admin', role: 'admin', avatar: null,
    interviews: 100, avgScore: 99, streak: 99, joinedAt: '2026-05-14' },
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [allUsers, setAllUsers] = useState(() => {
    const saved = localStorage.getItem('iai_users')
    return saved ? JSON.parse(saved) : DEMO_USERS
  })

  useEffect(() => {
    const token = localStorage.getItem('iai_token')
    const savedUser = localStorage.getItem('iai_user')
    if (token && savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    localStorage.setItem('iai_users', JSON.stringify(allUsers))
  }, [allUsers])

  const login = async (email, password) => {
    const found = allUsers.find(u => u.email === email && u.password === password)
    if (!found) {
      throw new Error('Invalid email or password')
    }
    const token = btoa(JSON.stringify({ id: found.id, email: found.email, exp: Date.now() + 86400000 }))
    const { password: _, ...userWithoutPw } = found
    localStorage.setItem('iai_token', token)
    localStorage.setItem('iai_user', JSON.stringify(userWithoutPw))
    setUser(userWithoutPw)
    toast.success(`Welcome back, ${found.name}!`)
    return userWithoutPw
  }

  const signup = async (name, email, password) => {
    const exists = allUsers.find(u => u.email === email)
    if (exists) {
      throw new Error('Email already registered')
    }
    const newUser = {
      id: Date.now().toString(),
      name, 
      email, 
      password, 
      role: name === 'Hammadtahir787' ? 'admin' : 'user', 
      avatar: null,
      interviews: 0, 
      avgScore: 0, 
      streak: 0,
      joinedAt: new Date().toISOString().split('T')[0],
    }
    setAllUsers(prev => [...prev, newUser])
    const token = btoa(JSON.stringify({ id: newUser.id, email: newUser.email, exp: Date.now() + 86400000 }))
    const { password: _, ...userWithoutPw } = newUser
    localStorage.setItem('iai_token', token)
    localStorage.setItem('iai_user', JSON.stringify(userWithoutPw))
    setUser(userWithoutPw)
    toast.success('Account created successfully!')
    return userWithoutPw
  }

  const logout = () => {
    localStorage.removeItem('iai_token')
    localStorage.removeItem('iai_user')
    setUser(null)
    toast.success('Logged out successfully')
  }

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    localStorage.setItem('iai_user', JSON.stringify(updatedUser))
    setAllUsers(prev => prev.map(u => u.id === user.id ? { ...u, ...updates } : u))
    toast.success('Profile updated')
  }

  return (
    <AuthContext.Provider value={{
      user, loading, login, signup, logout, updateProfile,
      allUsers, isAdmin: user?.role === 'admin',
    }}>
      {children}
    </AuthContext.Provider>
  )
}
