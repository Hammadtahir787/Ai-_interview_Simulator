import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const JWT_SECRET = process.env.JWT_SECRET || 'interviewai-secret-key-2026'

app.use(cors())
app.use(express.json({ limit: '10mb' }))

// ── In-memory store (replace with MongoDB in production) ──
const users = [
  { id: '1', name: 'Alex Johnson', email: 'alex@demo.com', password: 'demo123', role: 'user' },
  { id: '2', name: 'Admin User', email: 'admin@demo.com', password: 'admin123', role: 'admin' },
]
const interviews = []

// ── Auth middleware ──
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'No token provided' })
  try {
    req.user = jwt.verify(token, JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
}

// ── Auth Routes ──
app.post('/api/auth/signup', (req, res) => {
  const { name, email, password } = req.body
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'Email already registered' })
  }
  const user = { id: Date.now().toString(), name, email, password, role: 'user' }
  users.push(user)
  const token = jwt.sign({ id: user.id, email, role: user.role }, JWT_SECRET, { expiresIn: '24h' })
  res.json({ token, user: { id: user.id, name, email, role: user.role } })
})

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body
  const user = users.find(u => u.email === email && u.password === password)
  if (!user) return res.status(401).json({ error: 'Invalid credentials' })
  const token = jwt.sign({ id: user.id, email, role: user.role }, JWT_SECRET, { expiresIn: '24h' })
  res.json({ token, user: { id: user.id, name: user.name, email, role: user.role } })
})

app.get('/api/auth/me', authMiddleware, (req, res) => {
  const user = users.find(u => u.id === req.user.id)
  if (!user) return res.status(404).json({ error: 'User not found' })
  const { password, ...safe } = user
  res.json(safe)
})

// ── Interview Routes ──
app.post('/api/interviews', authMiddleware, (req, res) => {
  const interview = { ...req.body, id: Date.now().toString(), userId: req.user.id, createdAt: new Date() }
  interviews.push(interview)
  res.json(interview)
})

app.get('/api/interviews', authMiddleware, (req, res) => {
  res.json(interviews.filter(i => i.userId === req.user.id))
})

// ── Admin Routes ──
app.get('/api/admin/users', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' })
  res.json(users.map(({ password, ...u }) => u))
})

app.get('/api/admin/stats', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' })
  res.json({ totalUsers: users.length, totalInterviews: interviews.length })
})

// ── Health ──
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date() }))

app.listen(PORT, () => console.log(`🚀 InterviewAI API running on port ${PORT}`))
