import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import supabase from '../lib/supabase.js' // handles dotenv + client

const router = express.Router()

// 🧾 Register Route
router.post('/register', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password)
    return res.status(400).json({ error: 'Email and password are required' })

  try {
    const id = uuidv4()
    const hashedPassword = await bcrypt.hash(password, 10)

    const { error } = await supabase
      .from('users')
      .insert([{ id, email, password: hashedPassword }])

    if (error) throw new Error(error.message)

    res.status(201).json({ message: 'User registered successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 🔐 Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password)
    return res.status(400).json({ error: 'Email and password are required' })

  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .limit(1)
      .single()

    if (error || !users) return res.status(400).json({ error: 'Invalid email or user not found' })

    const match = await bcrypt.compare(password, users.password)
    if (!match) return res.status(401).json({ error: 'Incorrect password' })

    const token = jwt.sign(
      { id: users.id, email: users.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    res.status(200).json({ token })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
