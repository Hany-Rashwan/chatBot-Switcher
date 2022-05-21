import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Payload } from './test';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: Payload,
      useClass: Payload,
    },
  ],
})
export class AppModule {}
