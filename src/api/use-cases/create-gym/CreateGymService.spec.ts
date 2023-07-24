import { it, describe, expect, beforeEach } from 'vitest'
import CreateGymService from './CreateGymService'
import InMemoryGymRepository from '../../repositories/in-memory/InMemoryGymRepository'
import { InvalidCredentialsError } from '../../errors/InvalidCredentialsError'

let createGymService: CreateGymService
let gymRepository: InMemoryGymRepository

describe('Create Gym Service', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository()
    createGymService = new CreateGymService(gymRepository)
  })
  it('should be able to create a new gym', async () => {
    await expect(createGymService.execute({
      title: 'new gym',
      latitude: 10,
      longitude: 10
    }))
      .resolves.not.toThrow()
  })
  it('shold not be able to create a new gym with latitude to equal 0', async () => {
    await expect(createGymService.execute({ title: 'new gym', latitude: 0, longitude: 10 })).rejects.toEqual(new InvalidCredentialsError())
  })
  it('shold not be able to create a new gym with longitude to equal 0', async () => {
    await expect(createGymService.execute({ title: 'new gym', latitude: 10, longitude: 0 })).rejects.toEqual(new InvalidCredentialsError())
  })
})
