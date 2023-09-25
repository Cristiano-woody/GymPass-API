import { type Gym } from '@prisma/client'

export interface ISearchGym {
  execute: (query: string, page: number) => Promise<Gym[]>
}
