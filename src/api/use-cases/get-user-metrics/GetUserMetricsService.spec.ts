import { describe, it, expect, beforeEach } from 'vitest'
import { type ICheckinRepository } from '../../interfaces/ICheckinRepository'
import CheckInEntity from '../../entities/CkeckinEntity'
import InMemoryCheckInRepository from '../../repositories/in-memory/InMemoryCheckInRepository'
import { type IGetUserMetricsService } from '../../interfaces/IGetUserMetricsService'
import GetUserMetricsService from './GetUserMetricsService'

let checkinRepository: ICheckinRepository
let sut: IGetUserMetricsService

describe('Get User Metrics', () => {
  beforeEach(async () => {
    checkinRepository = new InMemoryCheckInRepository()
    sut = new GetUserMetricsService(checkinRepository)
  })

  it('shold be able to get a user metrics', async () => {
    await checkinRepository.create(new CheckInEntity({ gym_id: '123', user_id: '123', id: '123' }))
    await checkinRepository.create(new CheckInEntity({ gym_id: '123', user_id: '123', id: '123' }))
    await checkinRepository.create(new CheckInEntity({ gym_id: '123', user_id: '123', id: '123' }))
    const checkInCount = await sut.execute('123')
    expect(checkInCount).toEqual(3)
  })
})
