import { type ISearchGymService } from '../../interfaces/ISearchGymService'
import { type IGymRepository } from '../../interfaces/IGymRepository'
import type GymEntity from '../../entities/GymEntity'

class SearchGymService implements ISearchGymService {
  constructor (private readonly GymRepository: IGymRepository) {}

  async execute (query: string, page: number): Promise<GymEntity[]> {
    const gyms = await this.GymRepository.searchMany(query, page)
    return gyms
  }
}

export default SearchGymService
