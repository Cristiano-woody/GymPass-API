import * as express from 'express'
import { type Request, type Response } from 'express'
import CreateGymController from '../controllers/CreateGymController'
import SearchGymController from '../controllers/SearchGymController'

const gymRoutes = express.Router()

gymRoutes.post('/gym', (req: Request, res: Response) => { void new CreateGymController().handle(req, res) })
gymRoutes.get('/gym/:query/:page', (req: Request, res: Response) => { void new SearchGymController().handle(req, res) })

export default gymRoutes
