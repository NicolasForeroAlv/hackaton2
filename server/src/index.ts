import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/auth';
import companyRoutes from './routes/companies';
import { errorHandler } from './utils/errorHandler';

dotenv.config();

const app = express();
const PORT: number = Number(process.env.PORT) || 4000;

// Seguridad básica
app.use(helmet());

// CORS restringido a frontend conocido
app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Límite de peticiones por IP (previene abuso de login)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Demasiadas peticiones, intenta más tarde",
});
app.use(limiter);

app.use(express.json());

// Rutas
app.use('/auth', authRoutes);
app.use('/companies', companyRoutes);

// Middleware de errores
app.use(errorHandler);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});

export default app; // Importante para las pruebas automatizadas
