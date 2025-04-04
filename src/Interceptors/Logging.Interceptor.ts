import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable } from 'rxjs';
import { PinoLogger } from 'nestjs-pino';
import { Request } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: PinoLogger) {
    this.logger.setContext('HTTP');
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    const { method, url, headers, body, user } = req;
    const userAgent = headers['user-agent'];
    const referer = headers['referer'] || '';
    const compression = headers['accept-encoding'] || '';
    const clientIp = req.ip || req.connection.remoteAddress;
    const requestSize = JSON.stringify(body)?.length || 0;
    const startTime = Date.now();

    return next.handle().pipe(
      map((responseBody) => {
        this.logger.info({
          // agent: userAgent,
          // client: clientIp,
          // compression: compression,
          referer: referer,
          request: `${method} ${url}`,
          size: requestSize,
          status: res.statusCode,
          timestamp: new Date().toISOString(),
          user: user?.username || 'anonymous',
          response: responseBody,
          durationMs: Date.now() - startTime,
        });
        return responseBody;
      }),
      catchError((err) => {
        this.logger.error({
          // agent: userAgent,
          // client: clientIp,
          // compression: compression,
          referer: referer,
          request: `${method} ${url}`,
          size: requestSize,
          status: err?.status || 500,
          timestamp: new Date().toISOString(),
          user: user?.username || 'anonymous',
          error: {
            message: err.message,
            stack: err.stack,
          },
          durationMs: Date.now() - startTime,
        });
        throw err;
      }),
    );
  }
}
