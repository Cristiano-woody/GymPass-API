import * as express from 'express'
import { type Request, type Response } from 'express'
import CreateGymController from '../controllers/CreateGymController'

const gymRoutes = express.Router()

gymRoutes.post('/gym', (req: Request, res: Response) => { void new CreateGymController().handle(req, res) })

export default gymRoutes
