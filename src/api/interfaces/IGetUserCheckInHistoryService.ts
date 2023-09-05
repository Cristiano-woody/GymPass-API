import type CheckInEntity from '../entities/CkeckinEntity'

export interface IGetUserCheckInHistoryService {
  execute: (id: string, page: number) => Promise<CheckInEntity[]>
}
