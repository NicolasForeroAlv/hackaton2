import { Router, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const router = Router()

// Usuario de prueba (en un proyecto real vendría de la BD)
const mockUser = {
  email: "admin@test.com",
  password: "123456"
}

// Ruta de login
router.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body

  if (email === mockUser.email && password === mockUser.password) {
    // Firmar el token
    const token = jwt.sign(
      { email }, // payload
      process.env.JWT_SECRET || "secret", // clave secreta
      { expiresIn: "1h" } // duración
    )

    return res.json({ token })
  } else {
    return res.status(401).json({ message: "Credenciales inválidas" })
  }
})

// Opcional: ruta para verificar token
router.get('/me', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).json({ message: "Token faltante" })

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret")
    res.json({ user: decoded })
  } catch (err) {
    res.status(401).json({ message: "Token inválido" })
  }
})

export default router
