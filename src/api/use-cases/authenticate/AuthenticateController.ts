import { type Request, type Response } from 'express'
import { InvalidCredentialsError } from '../../errors/InvalidCredentialsError'
import { type IAuthenticateController } from '../../interfaces/IAuthenticateController'
import { type IAuthenticateService } from '../../interfaces/IAuthenticateService'

class AuthenticateController implements IAuthenticateController {
  //
  constructor (private readonly Authenticate: IAuthenticateService) {}
  //
  async handle (req: Request, res: Response): Promise<Response> {
    try {
      const User = await this.Authenticate.execute(req.body)
      return res.status(200).send(User.id)
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        return res.status(400).send({ message: error.message })
      }

      if (error instanceof Error) {
        return res.status(400).send({ message: error.message })
      }

      return res.status(500).send({ message: 'internal server error' })
    }
  }
}

export default AuthenticateController
