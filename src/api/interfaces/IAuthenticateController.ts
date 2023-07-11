import type { Request, Response } from 'express'

export interface IAuthenticateController {
  handle: (req: Request, res: Response) => Promise<Response>
}
