import GymRepository from '../../repositories/GymRepository'
import CreateGymService from './CreateGymService'

export const createGymFactory = (): CreateGymService => {
  const gymRepository = new GymRepository()
  const createGymService = new CreateGymService(gymRepository)
  return createGymService
}
