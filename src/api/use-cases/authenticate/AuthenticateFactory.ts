import UserRepository from '../../repositories/UserRepository'
import AuthenticateService from './AuthenticateService'
import AuthenticateController from './AuthenticateController'

export const authenticateFactory = (): AuthenticateController => {
  const userRepository = new UserRepository()
  const authenticateService = new AuthenticateService(userRepository)
  const authenticateController = new AuthenticateController(authenticateService)
  return authenticateController
}
