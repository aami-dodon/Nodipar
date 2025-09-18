import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

type ErrorWithStatus = Error & { status?: number };

export const errorHandler = (err: ErrorWithStatus, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ZodError) {
    return res.status(422).json({
      error: 'ValidationError',
      issues: err.issues,
    });
  }

  const prismaCode = (err as ErrorWithStatus & { code?: string }).code;
  if (prismaCode) {
    const status = prismaCode === 'P2002' ? 409 : 400;
    return res.status(status).json({
      error: 'DatabaseError',
      code: prismaCode,
      message: err.message,
    });
  }

  const status = err.status ?? 500;
  return res.status(status).json({
    error: err.name || 'ServerError',
    message: err.message || 'Unexpected server error',
  });
};
