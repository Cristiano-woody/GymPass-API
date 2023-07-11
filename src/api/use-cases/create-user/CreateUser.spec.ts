import { beforeEach, describe, expect, it } from 'vitest'
import CreateUserService from './CreateUserService'
import InMemoryUserRepository from '../../repositories/in-memory/InMemoryUserRepository'
import { UserAlreadyExistsError } from '../../errors/UserAlreadyExistserror'
import { InvalidCredentialsError } from '../../errors/InvalidCredentialsError'

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
  it('shold be able to create a user', async () => {
    const newUser = { name: 'John', email: 'john@example.com', password: '' }
    await expect(createUser.execute(newUser)).rejects.toEqual(new InvalidCredentialsError())
  })
  it('should not be able to create a user with duplicate email', async () => {
    const newUser = { name: 'John', email: 'john@example.com', password: '12345' }
    await createUser.execute(newUser)

    await expect(createUser.execute(newUser)).rejects.toEqual(new UserAlreadyExistsError())
  })
  it('shold not be able to create a user with invalid email', async () => {
    const newUser = { name: 'john', email: 'fooexample.com', password: '12345' }
    await expect(createUser.execute(newUser)).rejects.toEqual(new InvalidCredentialsError())
  })
  it('shold not be able to create a user with invalid email', async () => {
    const newUser = { name: 'john', email: 'foo@ example.com', password: '12345' }
    await expect(createUser.execute(newUser)).rejects.toEqual(new InvalidCredentialsError())
  })
  it('shold not be able to create a user with invalid email', async () => {
    const newUser = { name: 'john', email: 'foo@example', password: '12345' }
    await expect(createUser.execute(newUser)).rejects.toEqual(new InvalidCredentialsError())
  })
})
