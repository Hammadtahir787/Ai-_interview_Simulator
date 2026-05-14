import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { getRandomQuestions, evaluateAnswer, ROLES, DIFFICULTIES } from '../utils/questions'
import { useSpeech } from '../hooks/useSpeech'
import {
  HiOutlineMicrophone,
  HiOutlineStopCircle,
  HiOutlinePaperAirplane,
  HiOutlineSpeakerWave,
  HiOutlineSpeakerXMark,
  HiOutlineClock,
  HiOutlineArrowRight,
} from 'react-icons/hi2'

export default function InterviewSession() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const roleId = searchParams.get('role') || 'software-engineer'
  const difficulty = searchParams.get('difficulty') || 'beginner'
  const count = parseInt(searchParams.get('count') || '5')

  const role = ROLES.find(r => r.id === roleId)
  const diff = DIFFICULTIES.find(d => d.id === difficulty)

  const [questions] = useState(() => getRandomQuestions(roleId, difficulty, count))
  const [currentQ, setCurrentQ] = useState(0)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [answers, setAnswers] = useState([])
  const [timer, setTimer] = useState(120) // 2 minutes per question
  const [timerActive, setTimerActive] = useState(false)
  const [finished, setFinished] = useState(false)

  const chatRef = useRef(null)
  const inputRef = useRef(null)
  const { isListening, transcript, startListening, stopListening, speak, isSpeaking, stopSpeaking, clearTranscript, setTranscript } = useSpeech()

  // Auto-scroll chat
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages, isTyping])

  // Timer countdown
  useEffect(() => {
    if (!timerActive || timer <= 0) return
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          setTimerActive(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [timerActive, timer])

  // Use transcript from voice
  useEffect(() => {
    if (transcript.trim()) {
      setInput(prev => prev + transcript)
      clearTranscript()
    }
  }, [transcript, clearTranscript])

  // Start first question
  useEffect(() => {
    if (questions.length > 0) {
      const greeting = `Welcome to your ${diff?.label} ${role?.title} interview! I'll be asking you ${questions.length} questions. Take your time and answer thoroughly.\n\nLet's begin with your first question:`
      simulateAiMessage(greeting, () => {
        setTimeout(() => {
          simulateAiMessage(questions[0].q, () => {
            setTimerActive(true)
          })
        }, 500)
      })
    }
  }, []) // eslint-disable-line

  const simulateAiMessage = useCallback((text, onComplete) => {
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages(prev => [...prev, { role: 'ai', text, timestamp: Date.now() }])
      if (onComplete) onComplete()
    }, 800 + Math.random() * 700)
  }, [])

  const handleSubmit = (e) => {
    e?.preventDefault()
    const answer = input.trim()
    if (!answer) return

    // Add user message
    setMessages(prev => [...prev, { role: 'user', text: answer, timestamp: Date.now() }])
    setInput('')
    setTimerActive(false)

    // Evaluate
    const evaluation = evaluateAnswer(questions[currentQ].q, answer)
    setAnswers(prev => [...prev, {
      question: questions[currentQ].q,
      answer,
      evaluation,
      timeSpent: 120 - timer,
    }])

    // AI feedback
    const feedbackMsg = `Score: ${evaluation.overall}%\n\n${evaluation.feedback}`
    simulateAiMessage(feedbackMsg, () => {
      const nextQ = currentQ + 1
      if (nextQ < questions.length) {
        setCurrentQ(nextQ)
        setTimer(120)
        setTimeout(() => {
          simulateAiMessage(`Question ${nextQ + 1} of ${questions.length}:\n\n${questions[nextQ].q}`, () => {
            setTimerActive(true)
          })
        }, 800)
      } else {
        setTimeout(() => {
          simulateAiMessage("Great job! You've completed all the questions. Let me prepare your detailed results...", () => {
            setFinished(true)
          })
        }, 800)
      }
    })
  }

  const handleFinish = () => {
    const results = {
      role: roleId,
      difficulty,
      answers,
      date: new Date().toISOString(),
      questionsCount: questions.length,
      scores: {
        communication: Math.round(answers.reduce((s, a) => s + a.evaluation.communication, 0) / answers.length),
        confidence: Math.round(answers.reduce((s, a) => s + a.evaluation.confidence, 0) / answers.length),
        technical: Math.round(answers.reduce((s, a) => s + a.evaluation.technical, 0) / answers.length),
        overall: Math.round(answers.reduce((s, a) => s + a.evaluation.overall, 0) / answers.length),
      },
      duration: Math.round(answers.reduce((s, a) => s + a.timeSpent, 0) / 60),
    }

    // Save to history
    const history = JSON.parse(localStorage.getItem('iai_history') || '[]')
    history.unshift({ ...results, id: `int-${Date.now()}` })
    localStorage.setItem('iai_history', JSON.stringify(history))

    // Navigate to results
    sessionStorage.setItem('iai_results', JSON.stringify(results))
    navigate('/results')
  }

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`

  const timerColor = timer > 60 ? '#10B981' : timer > 30 ? '#F59E0B' : '#EF4444'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}
    >
      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 0', marginBottom: 16,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontSize: '1.5rem' }}>{role?.icon}</span>
          <div>
            <h1 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>{role?.title} Interview</h1>
            <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>
              {diff?.label} • Question {Math.min(currentQ + 1, questions.length)}/{questions.length}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Timer */}
          {timerActive && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '8px 16px', borderRadius: 10,
                background: `${timerColor}15`, border: `1px solid ${timerColor}30`,
              }}
            >
              <HiOutlineClock size={18} style={{ color: timerColor }} />
              <span style={{ fontSize: '1rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: timerColor }}>
                {formatTime(timer)}
              </span>
            </motion.div>
          )}

          {/* Progress */}
          <div style={{ width: 120 }}>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: `${(answers.length / questions.length) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div
        ref={chatRef}
        style={{
          flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column',
          gap: 16, padding: '16px 0',
        }}
      >
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}
            >
              <div style={{ display: 'flex', gap: 10, maxWidth: '80%', alignItems: 'flex-start' }}>
                {msg.role === 'ai' && (
                  <div style={{
                    width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                    background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.7rem', fontWeight: 800, color: 'white',
                  }}>AI</div>
                )}
                <div className={`chat-bubble ${msg.role}`}>
                  <div style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</div>
                  {msg.role === 'ai' && (
                    <button
                      onClick={() => isSpeaking ? stopSpeaking() : speak(msg.text)}
                      style={{
                        marginTop: 8, background: 'none', border: 'none',
                        color: '#64748b', cursor: 'pointer', fontSize: '0.75rem',
                        display: 'flex', alignItems: 'center', gap: 4,
                      }}
                    >
                      {isSpeaking ? <HiOutlineSpeakerXMark size={14} /> : <HiOutlineSpeakerWave size={14} />}
                      {isSpeaking ? 'Stop' : 'Listen'}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}
          >
            <div style={{
              width: 32, height: 32, borderRadius: 10,
              background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.7rem', fontWeight: 800, color: 'white',
            }}>AI</div>
            <div className="chat-bubble ai">
              <div className="typing-dots">
                <span /><span /><span />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input area */}
      {!finished ? (
        <motion.form
          onSubmit={handleSubmit}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{
            display: 'flex', gap: 10, padding: '16px 0',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div style={{ flex: 1, position: 'relative' }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit() } }}
              className="input-field"
              placeholder="Type your answer... (Shift+Enter for new line)"
              style={{
                resize: 'none', minHeight: 52, maxHeight: 150,
                paddingRight: 50, lineHeight: 1.5,
              }}
              rows={2}
              id="interview-answer-input"
            />
          </div>

          {/* Voice button */}
          <motion.button
            type="button"
            onClick={isListening ? stopListening : startListening}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: 52, height: 52, borderRadius: 14, border: 'none', cursor: 'pointer',
              background: isListening ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.06)',
              color: isListening ? '#EF4444' : '#94a3b8',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            id="voice-input-btn"
          >
            {isListening ? <HiOutlineStopCircle size={22} /> : <HiOutlineMicrophone size={22} />}
          </motion.button>

          {/* Send button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
            style={{
              width: 52, height: 52, borderRadius: 14, padding: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            disabled={!input.trim()}
            id="send-answer-btn"
          >
            <HiOutlinePaperAirplane size={20} style={{ position: 'relative', zIndex: 1 }} />
          </motion.button>
        </motion.form>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ padding: '20px 0', textAlign: 'center' }}
        >
          <motion.button
            onClick={handleFinish}
            className="btn-primary"
            style={{ padding: '16px 40px', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: 10 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            id="view-results-btn"
          >
            <span>View Detailed Results</span>
            <HiOutlineArrowRight size={18} style={{ position: 'relative', zIndex: 1 }} />
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  )
}
