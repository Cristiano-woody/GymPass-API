import type GymEntity from '../entities/GymEntity'

export interface ISearchGymService {
  execute: (query: string, page: number) => Promise<GymEntity[]>
}
