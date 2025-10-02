import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth'
import companyRoutes from './routes/companies'
import { errorHandler } from './utils/errorHandler'

dotenv.config()
const app = express()
const port = process.env.PORT || 4000

app.use(cors({
  origin: "*", // o puedes poner la URL del frontend si quieres más seguridad
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/companies', companyRoutes)

app.use(errorHandler)

const PORT: number = Number(process.env.PORT) || 4000

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})

