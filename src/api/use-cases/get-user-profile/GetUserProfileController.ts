import { type Request, type Response } from 'express'
import { type IGetUserProfileController } from '../../interfaces/IGetUserProfileController'
import { type IGetUserProfileService } from '../../interfaces/IGetUserProfileService'
import { InvalidCredentialsError } from '../../errors/InvalidCredentialsError'
import { UserDoesNotExistError } from '../../errors/UserDoesNotExistError'

class GetUserProfileController implements IGetUserProfileController {
  constructor (private readonly getUserProfileService: IGetUserProfileService) {}
  async handle (req: Request, res: Response): Promise<Response> {
    try {
      const User = await this.getUserProfileService.execute(req.params.id)
      return res.status(200).json(User)
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        return res.status(400).send({ message: error.message })
      }
      if (error instanceof UserDoesNotExistError) {
        return res.status(400).send({ message: error.message })
      }

      if (error instanceof Error) {
        return res.status(400).send({ message: error.message })
      }

      return res.status(500).send({ message: 'internal server error' })
    }
  }
}

export default GetUserProfileController
