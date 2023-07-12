import { describe, it, expect, beforeEach } from 'vitest'
import GetUserProfileService from './GetUserProfileService'
import InMemoryUserRepository from '../../repositories/in-memory/InMemoryUserRepository'
import { UserDoesNotExistError } from '../../errors/UserDoesNotExistError'
import { InvalidCredentialsError } from '../../errors/InvalidCredentialsError'

let userRepository: InMemoryUserRepository
let getUserProfileService: GetUserProfileService

describe('Get Profile User', () => {
  beforeEach(async () => {
    userRepository = new InMemoryUserRepository()
    getUserProfileService = new GetUserProfileService(userRepository)
    await userRepository.create({ name: 'john doe', password_hash: 'senha', email: 'john.doe@gmail.com', id: '1234' })
  })
  it('shold be able to get user profile', async () => {
    await expect(getUserProfileService.execute('1234')).resolves.not.toThrow()
  })
  it('shold not be able to get user profile with wrong id', async () => {
    await expect(getUserProfileService.execute('1')).rejects.toThrow(new UserDoesNotExistError())
  })
  it('shold not be able to get user profile with empity id', async () => {
    await expect(getUserProfileService.execute('')).rejects.toThrow(new InvalidCredentialsError())
  })
})
