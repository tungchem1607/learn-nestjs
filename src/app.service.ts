import { BadRequestException, Injectable } from '@nestjs/common';
// import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';

@Injectable()
export class AppService {
  // constructor(private readonly logger: PinoLogger) {
  //   // Optionally you can set context for logger in constructor or ...
  //   this.logger.setContext(AppService.name);
  // }

  // constructor(
  //   // ... set context via special decorator
  //   @InjectPinoLogger(AppService.name)
  //   private readonly logger: PinoLogger,
  // ) {}

  // private readonly logger = new Logger(AppService.name);
  getHello(): string {
    // this.logger.info('Hello from MyService with decorator');
    return 'Hello World!';
  }

  test(): object {
    // this.logger.info('Hello from MyService with decorator');
    throw new BadRequestException('Test error');
    return {
      status: 'success',
      message: 'Hello World!',
      data: 'Hello World!',
    };
  }
}
