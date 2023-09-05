import { type Request, type Response } from 'express'
import { type IGetUserCheckInHistoryService } from '../../interfaces/IGetUserCheckInHistoryService'
import { getUserCheckInHistoryFactory } from '../../use-cases/get-user-check-in-history/GetUserCheckInHistoryFactory'

class GetUserCheckInHistoryController {
  private readonly getUserCheckInHistoryService: IGetUserCheckInHistoryService

  constructor () {
    this.getUserCheckInHistoryService = getUserCheckInHistoryFactory()
  }

  async handle (req: Request, res: Response): Promise<Response> {
    try {
      const User = await this.getUserCheckInHistoryService.execute(req.params.id, parseInt(req.params.page))
      return res.status(200).json(User)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send({ message: error.message })
      }

      return res.status(500).send({ message: 'internal server error' })
    }
  }
}

export default GetUserCheckInHistoryController
