import GymRepository from '../../repositories/GymRepository'
import SearchGymService from './SearchGymService'

export const SearchGymServiceFactory = (): SearchGymService => {
  const gymRepository = new GymRepository()
  const searchGymService = new SearchGymService(gymRepository)
  return searchGymService
}
