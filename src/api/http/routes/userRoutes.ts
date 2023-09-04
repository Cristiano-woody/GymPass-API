import * as express from 'express'
import { type Request, type Response } from 'express'
import CreateUserController from '../controllers/CreateUserController'
import AuthenticateController from '../controllers/AuthenticateController'
import GetUserProfileController from '../controllers/GetUserProfileController'

const userRoutes = express.Router()

userRoutes.post('/user', (req: Request, res: Response) => { void new CreateUserController().handle(req, res) })
userRoutes.post('/user/auth', (req: Request, res: Response) => { void new AuthenticateController().handle(req, res) })
userRoutes.get('/user/:id', (req: Request, res: Response) => { void new GetUserProfileController().handle(req, res) })

export default userRoutes
