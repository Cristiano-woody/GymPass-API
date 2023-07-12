import type UserEntity from '../entities/UserEntity'

export interface IGetUserProfileService {
  execute: (id: string) => Promise<UserEntity>
}
