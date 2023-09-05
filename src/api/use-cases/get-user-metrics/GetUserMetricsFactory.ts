import GetUserMetricsService from './GetUserMetricsService'
import CheckInRepository from '../../repositories/CheckInRepository'

export const GetUserMetricsFactory = (): GetUserMetricsService => {
  const checkInRepository = new CheckInRepository()
  const getUserMetricsService = new GetUserMetricsService(checkInRepository)
  return getUserMetricsService
}
