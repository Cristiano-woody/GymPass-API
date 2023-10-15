import { describe, it, expect, beforeEach } from 'vitest'
import SearchGymService from './SearchGymService'
import GymEntity from '../../entities/GymEntity'
import InMemoryGymRepository from '../../repositories/in-memory/InMemoryGymRepository'

let GymRepository: InMemoryGymRepository
let sut: SearchGymService

describe('Get CheckIn History Service', () => {
  beforeEach(async () => {
    GymRepository = new InMemoryGymRepository()
    sut = new SearchGymService(GymRepository)
  })

  it('shold be able to search for gyms', async () => {
    await GymRepository.create(new GymEntity({ title: 'Hercules Gym', latitude: 0, longitude: 10 }))
    await GymRepository.create(new GymEntity({ title: 'javaScript Gym', latitude: 0, longitude: 10 }))
    const gyms = await sut.execute('Gym', 1)
    expect(Array.isArray(gyms)).toBe(true)
    expect(gyms[0]).toBeInstanceOf(GymEntity)
    expect(gyms).toHaveLength(2)
  })
  it('shold be able to fetch paginated Gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await GymRepository.create(new GymEntity({
        title: `javaScript Gym ${i}`,
        latitude: 0,
        longitude: 0
      }))
    }

    const gyms = await sut.execute('Gym', 2)
    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'javaScript Gym 21' }),
      expect.objectContaining({ title: 'javaScript Gym 22' })
    ])
  })
})
