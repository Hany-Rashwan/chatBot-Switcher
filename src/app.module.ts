import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config.module';
import { Payload } from './test';

@Module({
  imports: [AppConfigModule, ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [
    {
      provide: Payload,
      useClass: Payload,
    },
    AppService,
  ],
})
export class AppModule {}
