import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()

type User = { id: string; email: string; passwordHash: string }
const users: User[] = []

router.post('/register', async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ message: 'email and password required' })
    const exists = users.find(u => u.email === email)
    if (exists) return res.status(400).json({ message: 'user exists' })
    const hash = await bcrypt.hash(password, 10)
    const user = { id: String(Date.now()), email, passwordHash: hash }
    users.push(user)
    res.json({ id: user.id, email: user.email })
  } catch (err) { next(err) }
})

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = users.find(u => u.email === email)
    if (!user) return res.status(401).json({ message: 'invalid credentials' })
    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) return res.status(401).json({ message: 'invalid credentials' })
    const token = jwt.sign({ sub: user.id, email: user.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '8h' })
    res.json({ token })
  } catch (err) { next(err) }
})

export default router
