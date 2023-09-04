import express from 'express'
import cors from 'cors'
import userRoutes from './api/http/routes/userRoutes'
import gymRoutes from './api/http/routes/gymRoutes'
import chckInRoutes from './api/http/routes/checkInRoutes'

const app = express()

app.use(express.json())
app.use(cors())
app.use(userRoutes)
app.use(gymRoutes)
app.use(chckInRoutes)

export default app
