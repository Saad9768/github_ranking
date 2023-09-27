import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { Request, Response } from 'express';

@Catch()
export class UnHandledException implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const { status, message } =
      exception instanceof AxiosError
        ? { status: exception.response.status, message: exception.message }
        : exception instanceof HttpException
          ? { status: exception.getStatus(), message: exception.message }
          : { status: 500, message: 'Internal Server Error' };

    Logger.error(`Exception :: ${message}`)

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.originalUrl,
      message,
    });
  }
}
