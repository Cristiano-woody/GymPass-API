import type UserEntity from '../entities/UserEntity'

export interface IAuthenticateService {
  execute: (user: { email: string, password: string }) => Promise<UserEntity>
}
