import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Payload } from './test';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ScheduleModule.forRoot()],
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
