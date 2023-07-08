import * as express from 'express'
import { type Request, type Response } from 'express'
import { cresteUserFactory } from '../use-cases/create-user/CresteUserFactory'

const userRoutes = express.Router()

userRoutes.post('/user', (req: Request, res: Response) => { void cresteUserFactory().handle(req, res) })

export default userRoutes
