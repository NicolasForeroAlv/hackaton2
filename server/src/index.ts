import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth'
import companyRoutes from './routes/companies'
import { errorHandler } from './utils/errorHandler'

dotenv.config()
const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/companies', companyRoutes)

app.use(errorHandler)

app.listen(port, ()=> {
  console.log(`Server listening on http://localhost:${port}`)
})
