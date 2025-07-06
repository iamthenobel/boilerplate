// server/index.js
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import authRoutes from './routes/auth.js'

// Load environment variables
dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Test route
app.get('/api/ping', (req, res) => {
  res.json({ message: 'Server is alive!' })
})

// Auth routes
app.use('/api/auth', authRoutes)

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`)
})
