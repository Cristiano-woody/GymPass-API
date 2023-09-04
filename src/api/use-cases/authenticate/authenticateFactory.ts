import UserRepository from '../../repositories/UserRepository'
import AuthenticateService from './AuthenticateService'

export const authenticateFactory = (): AuthenticateService => {
  const userRepository = new UserRepository()
  const authenticateService = new AuthenticateService(userRepository)
  return authenticateService
}
