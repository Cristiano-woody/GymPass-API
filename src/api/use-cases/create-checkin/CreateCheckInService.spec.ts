import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import InMemoryCheckInRepository from '../../repositories/in-memory/InMemoryCheckInRepository'
import CreateCheckInService from './CreateCheckinService'
import { InvalidCredentialsError } from '../../errors/InvalidCredentialsError'
import InMemoryUserRepository from '../../repositories/in-memory/InMemoryUserRepository'
import { ResourceNotFoundError } from '../../errors/ResourceNotFoundError'
import { TwoCheckInsAreNotAlowed } from '../../errors/TwoCheckInsAreNotAlowed'

let checkInRepository: InMemoryCheckInRepository
let createCheckInService: CreateCheckInService
let UserRepository: InMemoryUserRepository

describe('Create a checkIn ', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository()
    UserRepository = new InMemoryUserRepository()
    createCheckInService = new CreateCheckInService(checkInRepository, UserRepository)
    const user = { email: 'johndoe@example.com', name: 'john doe', password_hash: '1234', id: 'user1234' }
    void UserRepository.create(user)
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })
  it('shold be able to create a checkIn', async () => {
    await expect(createCheckInService.execute({ gymId: 'asd12e-123wsd-12412', userId: 'user1234' })).resolves.not.toThrow()
  })
  it('shold not be able to create a checkIn with empty userId field', async () => {
    await expect(createCheckInService.execute({ gymId: 'asd12e-123wsd-12412', userId: '' })).rejects.toThrow(new InvalidCredentialsError())
  })
  it('shold not be able to create a checkIn with empty gymId field', async () => {
    await expect(createCheckInService.execute({ gymId: '', userId: 'asdq13-sdfw12-sfsdf3' })).rejects.toThrow(new InvalidCredentialsError())
  })
  it('should not be able to create a CheckIn with unregistered user', async () => {
    await expect(createCheckInService.execute({ gymId: 'asd12e-123wsd-12412', userId: 'user Does not exist' })).rejects.toThrow(new ResourceNotFoundError())
  })
  it('shold not be able to check in twice inthe same day', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))
    await createCheckInService.execute({ gymId: 'asd12e-123wsd-12412', userId: 'user1234' })
    await expect(createCheckInService.execute({ gymId: 'asd12e-123wsd-12412', userId: 'user1234' })).rejects.toThrow(new TwoCheckInsAreNotAlowed())
  })
  it('shold be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))
    await createCheckInService.execute({ gymId: 'asd12e-123wsd-12412', userId: 'user1234' })
    vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0))
    await expect(createCheckInService.execute({ gymId: 'asd12e-123wsd-12412', userId: 'user1234' })).resolves.not.toThrow()
  })
})
