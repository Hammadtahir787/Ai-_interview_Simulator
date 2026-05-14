// ═══════════════════════════════════════════════════════════
// InterviewAI — Question Bank
// Curated questions by role & difficulty
// ═══════════════════════════════════════════════════════════

export const ROLES = [
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    icon: '💻',
    color: '#7C3AED',
    description: 'Technical interviews covering DSA, system design, and coding',
  },
  {
    id: 'customer-support',
    title: 'Customer Support',
    icon: '🎧',
    color: '#06B6D4',
    description: 'Scenario-based questions on conflict resolution and empathy',
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    icon: '📊',
    color: '#10B981',
    description: 'SQL, data modeling, statistics, and business intelligence',
  },
  {
    id: 'marketing',
    title: 'Marketing',
    icon: '📈',
    color: '#F59E0B',
    description: 'Digital marketing, brand strategy, and growth hacking',
  },
]

export const DIFFICULTIES = [
  { id: 'beginner', label: 'Beginner', color: '#10B981', description: 'Foundational concepts' },
  { id: 'intermediate', label: 'Intermediate', color: '#F59E0B', description: 'Applied knowledge' },
  { id: 'advanced', label: 'Advanced', color: '#EF4444', description: 'Expert-level challenges' },
]

const questionBank = {
  'software-engineer': {
    beginner: [
      { q: "What is the difference between a stack and a queue? Can you give real-world examples of each?", tips: "Focus on LIFO vs FIFO ordering and practical use cases." },
      { q: "Explain what an API is and how RESTful APIs work.", tips: "Cover HTTP methods, endpoints, and request/response cycle." },
      { q: "What is the difference between == and === in JavaScript?", tips: "Discuss type coercion and strict equality." },
      { q: "Can you explain what version control is and why Git is important in software development?", tips: "Mention collaboration, history tracking, and branching." },
      { q: "What are the basic principles of Object-Oriented Programming?", tips: "Cover encapsulation, inheritance, polymorphism, and abstraction." },
      { q: "Explain the difference between SQL and NoSQL databases. When would you choose one over the other?", tips: "Discuss structure, scalability, and use cases." },
      { q: "What is the DOM and how does JavaScript interact with it?", tips: "Explain the document object model and manipulation methods." },
      { q: "Describe the software development lifecycle (SDLC) and its common methodologies.", tips: "Cover Agile, Waterfall, and iterative approaches." },
    ],
    intermediate: [
      { q: "Explain the concept of closures in JavaScript and provide a practical use case.", tips: "Discuss lexical scope, data privacy, and factory functions." },
      { q: "How would you design a URL shortening service like bit.ly? Walk me through the architecture.", tips: "Cover hashing, database design, and redirect flow." },
      { q: "What are microservices and how do they differ from a monolithic architecture? What are the tradeoffs?", tips: "Discuss scalability, complexity, deployment, and communication." },
      { q: "Explain how you would optimize a slow database query. What tools and techniques would you use?", tips: "Cover indexing, query plans, denormalization, and caching." },
      { q: "Describe the event loop in Node.js. How does it handle asynchronous operations?", tips: "Explain call stack, callback queue, and microtasks." },
      { q: "What is the difference between horizontal and vertical scaling? When would you use each?", tips: "Discuss load balancing, cost, and infrastructure." },
    ],
    advanced: [
      { q: "Design a real-time collaborative editing system like Google Docs. How would you handle conflict resolution?", tips: "Discuss OT/CRDT algorithms, WebSockets, and consistency models." },
      { q: "Explain the CAP theorem and how it applies to distributed database design. Give specific examples.", tips: "Cover consistency, availability, partition tolerance tradeoffs." },
      { q: "How would you design a distributed rate limiter that works across multiple servers?", tips: "Discuss token bucket, sliding window, and Redis-based solutions." },
      { q: "Explain how garbage collection works in V8 engine. What are the different algorithms used?", tips: "Cover generational GC, mark-and-sweep, and scavenger." },
      { q: "Design a system to handle 10 million concurrent WebSocket connections. What challenges would you face?", tips: "Discuss connection management, memory, and horizontal scaling." },
    ],
  },
  'customer-support': {
    beginner: [
      { q: "A customer is upset because their order arrived damaged. How would you handle this situation?", tips: "Show empathy, apologize, and offer a clear resolution." },
      { q: "How do you prioritize when you have multiple customers waiting for support?", tips: "Discuss urgency assessment and time management." },
      { q: "Describe a time when you had to explain a complex technical issue to a non-technical person.", tips: "Focus on simplification and patience." },
      { q: "What does excellent customer service mean to you?", tips: "Cover empathy, efficiency, and going above expectations." },
      { q: "How would you handle a customer who keeps asking the same question?", tips: "Show patience and try different explanation approaches." },
      { q: "What would you do if you didn't know the answer to a customer's question?", tips: "Discuss honesty, research, and follow-up." },
    ],
    intermediate: [
      { q: "A customer threatens to leave a negative review unless they get a full refund outside of policy. What do you do?", tips: "Balance company policy with customer satisfaction." },
      { q: "How would you handle a situation where two departments give conflicting information to a customer?", tips: "Discuss escalation, verification, and single source of truth." },
      { q: "Describe your approach to reducing customer churn through proactive support.", tips: "Cover early warning signs and outreach strategies." },
      { q: "How do you measure the success of a customer support interaction?", tips: "Discuss CSAT, NPS, resolution time, and first contact resolution." },
    ],
    advanced: [
      { q: "Design a customer support workflow for a SaaS product that handles 50,000 tickets per month.", tips: "Cover tiering, automation, routing, and quality assurance." },
      { q: "How would you implement a customer success program from scratch? What metrics would you track?", tips: "Discuss health scores, onboarding, and retention strategies." },
      { q: "A critical system outage is affecting thousands of customers. Outline your crisis communication plan.", tips: "Cover status pages, proactive communication, and post-mortem." },
    ],
  },
  'data-analyst': {
    beginner: [
      { q: "What is the difference between INNER JOIN and LEFT JOIN in SQL? When would you use each?", tips: "Use a practical example with two related tables." },
      { q: "Explain what a primary key and foreign key are in a relational database.", tips: "Cover uniqueness, referential integrity, and relationships." },
      { q: "What is the difference between mean, median, and mode? When is each most useful?", tips: "Discuss when distributions are skewed." },
      { q: "How would you handle missing data in a dataset?", tips: "Cover imputation, deletion, and the impact on analysis." },
      { q: "What is a pivot table and how do you use it for data analysis?", tips: "Explain aggregation and cross-tabulation." },
      { q: "Explain what data normalization is and why it's important.", tips: "Discuss database design forms and consistency." },
    ],
    intermediate: [
      { q: "Write a SQL query to find the top 3 customers by revenue for each product category in the last quarter.", tips: "Use window functions like ROW_NUMBER() with PARTITION BY." },
      { q: "How would you design a dashboard to track key business metrics for an e-commerce company?", tips: "Cover KPI selection, refresh frequency, and visualization choices." },
      { q: "Explain the difference between correlation and causation with a real-world example.", tips: "Use a concrete example and discuss confounding variables." },
      { q: "How do you approach A/B testing? What statistical concepts are important?", tips: "Cover hypothesis testing, sample size, and significance." },
    ],
    advanced: [
      { q: "Design a data pipeline that processes 1TB of data daily from multiple sources. What tools and architecture would you use?", tips: "Discuss ETL/ELT, streaming vs batch, and data quality." },
      { q: "Explain how you would build a predictive model for customer churn. Walk through feature engineering.", tips: "Cover feature selection, model choice, and validation." },
      { q: "How would you detect and handle data anomalies in a real-time monitoring system?", tips: "Discuss statistical methods, ML approaches, and alerting." },
    ],
  },
  'marketing': {
    beginner: [
      { q: "What is the difference between organic and paid marketing? How do they complement each other?", tips: "Cover SEO, content marketing, PPC, and social ads." },
      { q: "How would you define and identify a target audience for a new product?", tips: "Discuss demographics, psychographics, and personas." },
      { q: "What is a marketing funnel? Describe each stage and typical strategies.", tips: "Cover TOFU, MOFU, BOFU and corresponding tactics." },
      { q: "How do you measure the ROI of a marketing campaign?", tips: "Discuss attribution, conversion tracking, and LTV." },
      { q: "What makes a social media post go viral? What are the key ingredients?", tips: "Cover emotional triggers, timing, and shareability." },
    ],
    intermediate: [
      { q: "How would you develop a content marketing strategy for a B2B SaaS startup?", tips: "Cover buyer journey, content types, distribution, and measurement." },
      { q: "Describe how you would run an effective email marketing campaign. What metrics would you track?", tips: "Cover segmentation, personalization, A/B testing, and deliverability." },
      { q: "How do you approach SEO for a competitive keyword space? What strategies would you employ?", tips: "Discuss technical SEO, content strategy, and link building." },
      { q: "Explain the concept of growth hacking. Give examples of successful growth hacks.", tips: "Cover experimentation, product-led growth, and viral loops." },
    ],
    advanced: [
      { q: "Design a full-funnel marketing strategy for launching a new product in a crowded market.", tips: "Cover positioning, channels, budget allocation, and measurement." },
      { q: "How would you use data-driven marketing to optimize a $1M annual ad spend across multiple channels?", tips: "Discuss attribution modeling, incrementality testing, and optimization." },
      { q: "A company's brand reputation has been damaged by a PR crisis. Outline your recovery strategy.", tips: "Cover crisis response, sentiment monitoring, and reputation rebuilding." },
    ],
  },
}

export function getQuestions(roleId, difficulty) {
  return questionBank[roleId]?.[difficulty] || []
}

export function getRandomQuestions(roleId, difficulty, count = 5) {
  const questions = getQuestions(roleId, difficulty)
  const shuffled = [...questions].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

// AI evaluation simulation
export function evaluateAnswer(question, answer) {
  if (!answer || answer.trim().length === 0) {
    return { communication: 0, confidence: 0, technical: 0, overall: 0, feedback: 'No answer provided.' }
  }

  const wordCount = answer.trim().split(/\s+/).length
  const sentenceCount = answer.split(/[.!?]+/).filter(Boolean).length
  const hasStructure = /\b(first|second|third|additionally|moreover|however|therefore|in conclusion|for example)\b/i.test(answer)
  const hasSpecifics = /\b(api|sql|database|server|client|function|algorithm|data|metric|strategy|customer|process|system)\b/i.test(answer)

  // Communication: based on length, structure, and clarity
  let communication = Math.min(95, 30 + Math.min(wordCount * 0.5, 30) + (sentenceCount * 3) + (hasStructure ? 15 : 0))

  // Confidence: based on assertiveness and completeness
  const hasHedging = /\b(maybe|i think|probably|not sure|i guess)\b/i.test(answer)
  let confidence = Math.min(95, 40 + Math.min(wordCount * 0.4, 25) + (hasHedging ? -10 : 10) + (sentenceCount * 2))

  // Technical accuracy: based on keyword relevance
  let technical = Math.min(95, 25 + Math.min(wordCount * 0.3, 20) + (hasSpecifics ? 20 : 0) + (hasStructure ? 10 : 0) + (sentenceCount * 2))

  // Add some randomness for realism
  communication = Math.max(15, Math.min(98, communication + (Math.random() * 10 - 5)))
  confidence = Math.max(15, Math.min(98, confidence + (Math.random() * 10 - 5)))
  technical = Math.max(15, Math.min(98, technical + (Math.random() * 10 - 5)))

  const overall = Math.round((communication * 0.3 + confidence * 0.25 + technical * 0.45))

  const tips = []
  if (wordCount < 30) tips.push('Try to provide more detailed answers with specific examples.')
  if (!hasStructure) tips.push('Structure your answer with clear points (e.g., First... Second... Finally...).')
  if (!hasSpecifics) tips.push('Include relevant technical terms and specific examples to demonstrate expertise.')
  if (hasHedging) tips.push('Speak with more confidence — avoid hedging words like "maybe" or "I think".')
  if (sentenceCount < 3) tips.push('Expand your response with more complete thoughts and explanations.')
  if (communication > 80 && technical > 80) tips.push('Great response! Consider adding a real-world example to make it even stronger.')

  return {
    communication: Math.round(communication),
    confidence: Math.round(confidence),
    technical: Math.round(technical),
    overall,
    feedback: tips.length > 0 ? tips.join(' ') : 'Excellent answer! Keep up the great work.',
    tips,
  }
}

// Generate mock interview history
export function generateMockHistory() {
  const roles = ['software-engineer', 'customer-support', 'data-analyst', 'marketing']
  const diffs = ['beginner', 'intermediate', 'advanced']
  const history = []

  for (let i = 0; i < 8; i++) {
    const date = new Date()
    date.setDate(date.getDate() - i * 3)
    history.push({
      id: `int-${i}`,
      role: roles[i % roles.length],
      difficulty: diffs[i % diffs.length],
      date: date.toISOString(),
      questionsCount: 5,
      scores: {
        communication: 55 + Math.round(Math.random() * 40),
        confidence: 50 + Math.round(Math.random() * 45),
        technical: 45 + Math.round(Math.random() * 50),
        overall: 55 + Math.round(Math.random() * 40),
      },
      duration: 8 + Math.round(Math.random() * 15),
    })
  }

  return history.sort((a, b) => new Date(b.date) - new Date(a.date))
}
