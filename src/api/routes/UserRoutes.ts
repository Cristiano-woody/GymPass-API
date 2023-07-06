import * as express from 'express'
import { type Router, type Request, type Response } from 'express'

class UserRoutes {
  public readonly routes: Router
  constructor () {
    //
    this.routes = express.Router()
    //
    this.routes.post('/user', (req: Request, res: Response) => { res.status(200).send() })
  }
}

export default UserRoutes
