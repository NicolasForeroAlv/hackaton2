import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { encrypt, decrypt } from '../utils/crypto';

const router = Router();

const mockUser = {
  email: "admin@test.com",
  // Se guarda cifrada para simular un almacenamiento seguro
  password: encrypt("123456"),
};

// Middleware para validar token
function verifyToken(req: Request, res: Response, next: any) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Token faltante" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
}

// Ruta de login segura
router.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (email !== mockUser.email) {
    return res.status(401).json({ message: "Correo incorrecto" });
  }

  const decryptedPassword = decrypt(mockUser.password);
  if (password !== decryptedPassword) {
    return res.status(401).json({ message: "Contraseña incorrecta" });
  }

  const token = jwt.sign(
    { email },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "1h" }
  );

  return res.json({ token });
});

// Ruta protegida para obtener info del usuario
router.get('/me', verifyToken, (req: Request, res: Response) => {
  res.json({ user: (req as any).user });
});

export default router;
