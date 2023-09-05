import { describe, it, expect, beforeEach } from 'vitest'
import { type IGetUserCheckInHistoryService } from '../../interfaces/IGetUserCheckInHistoryService'
import GetCheckInHistoryService from './GetUserCheckInHistoryService'
import { type ICheckinRepository } from '../../interfaces/ICheckinRepository'
import CheckInEntity from '../../entities/CkeckinEntity'
import InMemoryCheckInRepository from '../../repositories/in-memory/InMemoryCheckInRepository'

let checkinRepository: ICheckinRepository
let sut: IGetUserCheckInHistoryService

describe('Get CheckIn History Service', () => {
  beforeEach(async () => {
    checkinRepository = new InMemoryCheckInRepository()
    sut = new GetCheckInHistoryService(checkinRepository)
  })

  it('shold be able to get a check in history', async () => {
    await checkinRepository.create(new CheckInEntity({ gym_id: '123', user_id: '123', id: '123' }))
    await checkinRepository.create(new CheckInEntity({ gym_id: '123', user_id: '123', id: '123' }))
    const checkins = await sut.execute('123', 1)
    expect(Array.isArray(checkins)).toBe(true)
    expect(checkins[0]).toBeInstanceOf(CheckInEntity)
    expect(checkins).toHaveLength(2)
  })
  it('shold be able to fetch paginated check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkinRepository.create(new CheckInEntity({ gym_id: `${i}`, user_id: '123', id: '123' }))
    }

    const checkins = await sut.execute('123', 2)
    expect(checkins).toHaveLength(2)
    expect(checkins).toEqual([
      expect.objectContaining({ gym_id: '21' }),
      expect.objectContaining({ gym_id: '22' })
    ])
  })
})
