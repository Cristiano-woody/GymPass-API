import type GymEntity from '../entities/GymEntity'

export interface IGymRepository {
  create: (data: { id?: string, title: string, latitude: number, longitude: number }) => Promise<void>
  getGym: (id: string) => Promise<GymEntity | undefined>
  searchMany: (query: string, page: number) => Promise<GymEntity[]>
}
