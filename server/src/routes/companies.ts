import express from 'express'
import jwt from 'jsonwebtoken'
import { encrypt, decrypt } from '../utils/crypto'
const router = express.Router()

type CompanyStored = { id: string; payload: string } // payload encrypted JSON

const companies: CompanyStored[] = []

function authMiddleware(req:any, res:any, next:any){
  const auth = req.headers.authorization?.split(' ')[1]
  if (!auth) return res.status(401).json({ message: 'no token' })
  try {
    const payload = jwt.verify(auth, process.env.JWT_SECRET || 'secret')
    (req as any).user = payload
    next()
  } catch (err) {
    return res.status(401).json({ message: 'invalid token' })
  }
}

router.use(authMiddleware)

router.get('/', (req, res) => {
  const list = companies.map(c => {
    try {
      const obj = JSON.parse(decrypt(c.payload))
      return { id: c.id, ...obj }
    } catch { return null }
  }).filter(Boolean)
  res.json(list)
})

router.post('/', (req,res) => {
  const { name, nit, employees } = req.body
  if (!name) return res.status(400).json({ message: 'name required' })
  const plain = JSON.stringify({ name, nit, employees: Number(employees) || 0 })
  const payload = encrypt(plain)
  const id = String(Date.now())
  companies.push({ id, payload })
  res.json({ id })
})

export default router
