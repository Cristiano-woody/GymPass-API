import UserRepository from '../../repositories/UserRepository'
import GymRepository from '../../repositories/GymRepository'
import CheckInRepository from '../../repositories/CheckInRepository'
import CreateCheckInService from './CreateCheckinService'
import CreateCheckInController from './CreateCheckInController'

export const CreateCheckInFactory = (): CreateCheckInController => {
  const userRepository = new UserRepository()
  const gymRepository = new GymRepository()
  const checkInRepository = new CheckInRepository()
  const checkInService = new CreateCheckInService(checkInRepository, userRepository, gymRepository)
  const checkInController = new CreateCheckInController(checkInService)
  return checkInController
}
