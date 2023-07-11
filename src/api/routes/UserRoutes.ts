import * as express from 'express'
import { type Request, type Response } from 'express'
import { cresteUserFactory } from '../use-cases/create-user/CresteUserFactory'
import { authenticateFactory } from '../use-cases/authenticate/AuthenticateFactory'

const userRoutes = express.Router()

userRoutes.post('/register', (req: Request, res: Response) => { void cresteUserFactory().handle(req, res) })
userRoutes.post('/authenticate', (req: Request, res: Response) => { void authenticateFactory().handle(req, res) })

export default userRoutes
