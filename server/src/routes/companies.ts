import { Router, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

const router = Router()

interface TokenPayload extends JwtPayload {
  email: string
}

// empresas guardadas en memoria
const companies: any[] = []

// Crear empresa
router.post('/', (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Token faltante' })

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret') as TokenPayload
    console.log('Usuario autenticado:', payload.email)

    const { name, nit, employees } = req.body

    if (!name || !nit || !employees) {
      return res.status(400).json({ message: 'Faltan datos de la empresa' })
    }

    const newCompany = { id: Date.now().toString(), name, nit, employees }
    companies.push(newCompany)

    res.json(newCompany)
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' })
  }
})

// Listar empresas
router.get('/', (req: Request, res: Response) => {
  res.json(companies)
})

export default router
