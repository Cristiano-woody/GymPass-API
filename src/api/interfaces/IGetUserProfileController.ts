import type { Request, Response } from 'express'

export interface IGetUserProfileController {
  handle: (req: Request, res: Response) => Promise<Response>
}
