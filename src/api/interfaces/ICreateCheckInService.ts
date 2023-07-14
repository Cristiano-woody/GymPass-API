import type CheckInEntity from '../entities/CkeckinEntity'

export interface ICreateCheckInService {
  execute: (data: CheckInEntity) => Promise<void>
}
