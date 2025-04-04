import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './Interceptors/Logging.Interceptor';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  // app.useLogger(app.get(Logger));
  const interceptor = app.get(LoggingInterceptor); // giờ không lỗi nữa
  app.useGlobalInterceptors(interceptor);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
