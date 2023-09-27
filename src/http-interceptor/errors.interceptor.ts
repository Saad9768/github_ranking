import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ErrorsInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        const status = err?.status ? err.status : 500;
        this.logger.error(
          `${err?.message} for url  ${
            context.getArgByIndex(0).originalUrl
          } with http status :: ${status}`,
        );
        // console.error(context)
        return throwError(() => new HttpException(err?.message, status));
      }),
    );
  }
}
