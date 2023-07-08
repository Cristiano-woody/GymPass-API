import { beforeEach, describe, expect, it } from 'vitest'
import CreateUserService from './CreateUserService'
import InMemoryUserRepository from '../../repositories/in-memory/InMemoryUserRepository'
import { UserAlreadyExistsError } from '../../errors/UserAlreadyExistserror'

let userRepository: InMemoryUserRepository
let createUser: CreateUserService

describe('Create user use-case', () => {
  beforeEach(async () => {
    userRepository = new InMemoryUserRepository()
    createUser = new CreateUserService(userRepository)
  })

  it('shold be able to create a user', async () => {
    const newUser = { name: 'John', email: 'john@example.com', password: '12345' }
    await expect(createUser.execute(newUser)).resolves.not.toThrow()
  })
  it('should not be able to create a user with duplicate email', async () => {
    const newUser = { name: 'John', email: 'john@example.com', password: '12345' }
    await createUser.execute(newUser)

    await expect(createUser.execute(newUser)).rejects.toEqual(new UserAlreadyExistsError())
  })
})
