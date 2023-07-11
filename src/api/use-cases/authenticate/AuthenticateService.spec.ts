import { describe, it, expect, beforeEach } from 'vitest'
import AutenticateService from './AuthenticateService'
import InMemoryUserRepository from '../../repositories/in-memory/InMemoryUserRepository'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../../errors/InvalidCredentialsError'

let userRepository: InMemoryUserRepository
let authemticate: AutenticateService

describe('Autenticate user', () => {
  beforeEach(async () => {
    userRepository = new InMemoryUserRepository()
    authemticate = new AutenticateService(userRepository)
    const user = { email: 'johndoe@example.com', name: 'john doe', password_hash: await hash('1234', 2) }
    void userRepository.create(user)
  })

  it('shold be able to autenticate user', () => {
    expect(authemticate.execute({ email: 'johndoe@example.com', password: '1234' })).resolves.not.toThrow()
  })
  it('shold not be able to authenticate user with wrong email', () => {
    expect(authemticate.execute({ email: 'wrongEmail@example.com', password: '1234' })).rejects.toThrow(new InvalidCredentialsError())
  })
  it('shold not be able to authenticate user with invalid email', () => {
    expect(authemticate.execute({ email: 'wrongEmail @example.com', password: '1234' })).rejects.toThrow(new InvalidCredentialsError())
  })
  it('shold not be able to authenticate user with wrong password', () => {
    expect(authemticate.execute({ email: 'johndoe@example.com', password: 'wrongPassword' })).rejects.toThrow(new InvalidCredentialsError())
  })
})
