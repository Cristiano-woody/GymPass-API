import { type Request, type Response } from 'express'
import { UserAlreadyExistsError } from '../../errors/UserAlreadyExistserror'
import { InvalidCredentialsError } from '../../errors/InvalidCredentialsError'
import { type ICreateUserService } from '../../interfaces/ICreateUserService'
import type { ICreateUserController } from '../../interfaces/ICreateUserController'
import { createUserFactory } from '../../use-cases/create-user/createUserFactory'

interface requestCreateUser {
  name: string
  email: string
  password: string
}

class CreateUserController implements ICreateUserController {
  private readonly CreateUserService: ICreateUserService
  constructor () {
    this.CreateUserService = createUserFactory()
  }

  async handle (req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password }: requestCreateUser = req.body.user
      await this.CreateUserService.execute({ name, email, password })
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
