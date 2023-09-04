import * as express from 'express'
import { type Request, type Response } from 'express'
import CreateCheckInController from '../controllers/CreateCheckInController'

const checkInRoutes = express.Router()

checkInRoutes.post('/check-in', (req: Request, res: Response) => { void new CreateCheckInController().handle(req, res) })

export default checkInRoutes
