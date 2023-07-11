import { type Request, type Response } from 'express'
import { UserAlreadyExistsError } from '../../errors/UserAlreadyExistserror'
import { InvalidCredentialsError } from '../../errors/InvalidCredentialsError'
import { type ICreateUserService } from '../../interfaces/ICreateUserService'
import type { ICreateUserController } from '../../interfaces/ICreateUserController'

class CreateUserController implements ICreateUserController {
  constructor (private readonly CreateUserService: ICreateUserService) {}
  async handle (req: Request, res: Response): Promise<Response> {
    try {
      await this.CreateUserService.execute(req.body)
      return res.status(201).send('User created successfully')
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        return res.status(409).send({ message: error.message })
      }
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

export default CreateUserController
