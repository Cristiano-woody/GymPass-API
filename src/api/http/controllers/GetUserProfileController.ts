import { type Request, type Response } from 'express'
import { type IGetUserProfileController } from '../../interfaces/IGetUserProfileController'
import { type IGetUserProfileService } from '../../interfaces/IGetUserProfileService'
import { InvalidCredentialsError } from '../../errors/InvalidCredentialsError'
import { ResourceNotFoundError } from '../../errors/ResourceNotFoundError'
import { getUserprofileFactory } from '../../use-cases/get-user-profile/getUserProfileFactory'

class GetUserProfileController implements IGetUserProfileController {
  private readonly getUserProfileService: IGetUserProfileService

  constructor () {
    this.getUserProfileService = getUserprofileFactory()
  }

  async handle (req: Request, res: Response): Promise<Response> {
    try {
      const User = await this.getUserProfileService.execute(req.params.id)
      return res.status(200).json(User)
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        return res.status(400).send({ message: error.message })
      }
      if (error instanceof ResourceNotFoundError) {
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
