import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from 'nestjs-pino';
import { LoggingInterceptor } from './Interceptors/Logging.Interceptor';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        autoLogging: false,
        // transport: {
        //   target: 'pino-pretty',
        //   options: {
        //     colorize: true,
        //     translateTime: 'HH:MM:ss',
        //     ignore: 'pid,hostname',
        //   },
        // },
        customProps: (req: any) => {
          return {
            user_id: req.user?.id || 'anonymous',
            body: req.body || {},
            topic_id: req.body?.topic_id || null,
            learn_time: req.body?.learn_time || null,
          };
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, LoggingInterceptor],
})
export class AppModule {}
