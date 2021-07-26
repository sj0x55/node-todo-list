import { NextFunction, Request, Response } from 'express';
import httpErrors from 'http-errors';
import { HttpStatusCodes } from '../enums/http-status-codes';

export function catchAsync(fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    fn(req, res, next).catch((err: Error) => next(err));
  };
}

export function notFoundHandler(req: Request, res: Response, next: NextFunction): void {
  next(new httpErrors.NotFound());
}

export function errorHandler(err: httpErrors.HttpError, req: Request, res: Response): void {
  res.status(err.status || HttpStatusCodes.InternalServerError);
  res.send(err.message);
}
