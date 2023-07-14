import type CheckInEntity from '../entities/CkeckinEntity'

export interface ICheckinRepository {
  create: (data: CheckInEntity) => Promise<CheckInEntity | undefined>
  fyndByUserInOnDate: (data: { date: Date, userId: string }) => Promise<CheckInEntity | undefined>
}
