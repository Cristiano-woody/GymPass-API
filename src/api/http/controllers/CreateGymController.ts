import { type Request, type Response } from 'express'
import { InvalidCredentialsError } from '../../errors/InvalidCredentialsError'
import { type ICreateGymService } from '../../interfaces/ICreateGymService'
import { createGymFactory } from '../../use-cases/create-gym/createGymFactory'

class CreateGymController {
  private readonly CreateGymService: ICreateGymService

  constructor () {
    this.CreateGymService = createGymFactory()
  }

  async handle (req: Request, res: Response): Promise<Response> {
    try {
      await this.CreateGymService.execute(req.body)
      return res.status(201).send('Gym created successfully')
    } catch (error) {
      //
      if (error instanceof InvalidCredentialsError) {
        return res.status(400).send({ message: error.message })
      }

      if (error instanceof Error) {
        return res.status(500).send({ message: error.message })
      }

      return res.status(500).send({ message: 'internal server error' })
    }
  }
}

export default CreateGymController
