import type CheckInEntity from '../entities/CkeckinEntity'

export interface ICheckinRepository {
  create: (data: CheckInEntity) => Promise<CheckInEntity | undefined>
}
