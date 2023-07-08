import express from 'express'
import cors from 'cors'
import userRoutes from './api/routes/UserRoutes'

const app = express()

app.use(express.json())
app.use(cors())
app.use(userRoutes)

export default app
