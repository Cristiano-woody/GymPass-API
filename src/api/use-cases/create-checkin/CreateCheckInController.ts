import { type Request, type Response } from 'express'
import { InvalidCredentialsError } from '../../errors/InvalidCredentialsError'
import { type ICreateCheckInService } from '../../interfaces/ICreateCheckInService'
import { ResourceNotFoundError } from '../../errors/ResourceNotFoundError'
import { TwoCheckInsAreNotAlowed } from '../../errors/TwoCheckInsAreNotAlowed'
import { MaxDistanceError } from '../../errors/MaxDistanceError'

class CreateCheckInController {
  constructor (private readonly CreateUserService: ICreateCheckInService) {}
  async handle (req: Request, res: Response): Promise<Response> {
    try {
      await this.CreateUserService.execute(req.body)
      return res.status(201).send('CheckIn created successfully')
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        return res.status(400).send({ message: error.message })
      }
      if (error instanceof ResourceNotFoundError) {
        return res.status(400).send({ message: error.message })
      }
      if (error instanceof TwoCheckInsAreNotAlowed) {
        return res.status(400).send({ message: error.message })
      }
      if (error instanceof MaxDistanceError) {
        return res.status(400).send({ message: error.message })
      }

      if (error instanceof Error) {
        return res.status(500).send({ message: error.message })
      }

      return res.status(500).send({ message: 'internal server error' })
    }
  }
}

export default CreateCheckInController
