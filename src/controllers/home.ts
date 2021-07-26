import { Request, Response } from 'express';

export function homeController(req: Request, res: Response): void {
  res.send('Hello World !!!');
}
