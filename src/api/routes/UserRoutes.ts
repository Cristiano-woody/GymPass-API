import * as express from 'express'
import { type Request, type Response } from 'express'
import { createUserFactory } from '../use-cases/create-user/createUserFactory'
import { authenticateFactory } from '../use-cases/authenticate/authenticateFactory'
import { getUserprofileFactory } from '../use-cases/get-user-profile/getUserProfileFactory'

const userRoutes = express.Router()

userRoutes.post('/register', (req: Request, res: Response) => { void createUserFactory().handle(req, res) })
userRoutes.post('/authenticate', (req: Request, res: Response) => { void authenticateFactory().handle(req, res) })
userRoutes.get('/profile/:id', (req: Request, res: Response) => { void getUserprofileFactory().handle(req, res) })

export default userRoutes
