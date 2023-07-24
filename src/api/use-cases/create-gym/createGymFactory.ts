import GymRepository from '../../repositories/GymRepository'
import CreateGymService from './CreateGymService'
import CreateGymController from './CreateGymController'

export const createGymFactory = (): CreateGymController => {
  const gymRepository = new GymRepository()
  const createGymService = new CreateGymService(gymRepository)
  const createGymController = new CreateGymController(createGymService)
  return createGymController
}
