import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import InMemoryCheckInRepository from '../../repositories/in-memory/InMemoryCheckInRepository'
import CreateCheckInService from './CreateCheckinService'
import { InvalidCredentialsError } from '../../errors/InvalidCredentialsError'
import InMemoryUserRepository from '../../repositories/in-memory/InMemoryUserRepository'
import { ResourceNotFoundError } from '../../errors/ResourceNotFoundError'
import { TwoCheckInsAreNotAlowed } from '../../errors/TwoCheckInsAreNotAlowed'
import InMemoryGymRepository from '../../repositories/in-memory/InMemoryGymRepository'
import { MaxDistanceError } from '../../errors/MaxDistanceError'

let checkInRepository: InMemoryCheckInRepository
let userRepository: InMemoryUserRepository
let gymRepository: InMemoryGymRepository
let createCheckInService: CreateCheckInService

const gymIdDefault = '123'
const userIdDefaul = 'user1234'

describe('Create a checkIn ', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository()
    userRepository = new InMemoryUserRepository()
    gymRepository = new InMemoryGymRepository()
    createCheckInService = new CreateCheckInService(checkInRepository, userRepository, gymRepository)

    void gymRepository.create({ id: gymIdDefault, title: 'tsAcademy', latitude: -8.0481364, longitude: -34.8791966 })
    void userRepository.create({ email: 'johndoe@example.com', name: 'john doe', password_hash: '1234', id: userIdDefaul })
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('shold be able to create a checkIn', async () => {
    await expect(createCheckInService.execute(
      {
        gymId: gymIdDefault,
        userId: userIdDefaul,
        userCoordinates: { latitude: -8.0481364, longitude: -34.8791966 }
      }
    )).resolves.not.toThrow()
  })

  it('shold not be able to create a checkIn with empty userId field', async () => {
    await expect(createCheckInService.execute(
      {
        gymId: gymIdDefault,
        userId: '',
        userCoordinates: { latitude: -8.0481364, longitude: -34.8791966 }
      }
    )).rejects.toThrow(new InvalidCredentialsError())
  })

  it('shold not be able to create a checkIn with empty gymId field', async () => {
    await expect(createCheckInService.execute(
      {
        gymId: '',
        userId: userIdDefaul,
        userCoordinates: { latitude: -8.0481364, longitude: -34.8791966 }
      }
    )).rejects.toThrow(new InvalidCredentialsError())
  })

  it('should not be able to create a CheckIn with unregistered user', async () => {
    await expect(createCheckInService.execute(
      {
        gymId: gymIdDefault,
        userId: 'user Does not exist',
        userCoordinates: { latitude: -8.0481364, longitude: -34.8791966 }
      }
    )).rejects.toThrow(new ResourceNotFoundError())
  })

  it('should not be able to create a CheckIn with unregistered gym', async () => {
    await expect(createCheckInService.execute(
      {
        gymId: 'unregistered gym',
        userId: userIdDefaul,
        userCoordinates: { latitude: -8.0481364, longitude: -34.8791966 }
      }
    )).rejects.toThrow(new ResourceNotFoundError())
  })

  it('shold not be able to check in twice inthe same day', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))
    await createCheckInService.execute(
      {
        gymId: gymIdDefault,
        userId: userIdDefaul,
        userCoordinates: { latitude: -8.0481364, longitude: -34.8791966 }
      })

    await expect(createCheckInService.execute(
      {
        gymId: gymIdDefault,
        userId: userIdDefaul,
        userCoordinates: { latitude: -8.0481364, longitude: -34.8791966 }
      }
    )).rejects.toThrow(new TwoCheckInsAreNotAlowed())
  })

  it('shold be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))
    await createCheckInService.execute(
      {
        gymId: gymIdDefault,
        userId: userIdDefaul,
        userCoordinates: { latitude: -8.0481364, longitude: -34.8791966 }
      })

    vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0))
    await expect(createCheckInService.execute(
      {
        gymId: gymIdDefault,
        userId: userIdDefaul,
        userCoordinates: { latitude: -8.0481364, longitude: -34.8791966 }
      }
    )).resolves.not.toThrow()
  })

  it('shold be able to create check in with a distance of less than 100 meters', async () => {
    await expect(createCheckInService.execute(
      {
        gymId: gymIdDefault,
        userId: userIdDefaul,
        userCoordinates: { latitude: -8.048729, longitude: -34.879487 }
      }
    )).resolves.not.toThrow()
  })

  it('shold not be able to create check in with a distance greater than 100 meters', async () => {
    await expect(createCheckInService.execute(
      {
        gymId: gymIdDefault,
        userId: userIdDefaul,
        userCoordinates: { latitude: -8.0490052, longitude: -34.8884457 }
      }
    )).rejects.toThrow(new MaxDistanceError())
  })
})
