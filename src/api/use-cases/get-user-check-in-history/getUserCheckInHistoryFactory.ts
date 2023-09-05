import CheckInRepository from '../../repositories/CheckInRepository'
import GetUserCheckInHistoryService from './GetUserCheckInHistoryService'

export const getUserCheckInHistoryFactory = (): GetUserCheckInHistoryService => {
  const checkInRepository = new CheckInRepository()
  const getCheckInHistoryService = new GetUserCheckInHistoryService(checkInRepository)
  return getCheckInHistoryService
}
