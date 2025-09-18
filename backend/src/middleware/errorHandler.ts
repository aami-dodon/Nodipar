import type { ErrorRequestHandler, RequestHandler } from 'express';

export const notFoundHandler: RequestHandler = (_req, res, next) => {
  res.status(404);
  next(new Error('Resource not found'));
};

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  const status = res.statusCode >= 400 ? res.statusCode : 500;
  res.status(status).json({
    message: error.message || 'Unexpected error',
    stack: process.env.NODE_ENV === 'production' ? undefined : error.stack
  });
};
