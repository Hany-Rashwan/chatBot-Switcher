import { Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Chat Bot Switcher')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('weekend')
  async goWeekendStrategy(): Promise<boolean> {
    return await this.appService.goWeekendStrategy();
  }

  @Post('backwork')
  async goWorkStrategy(): Promise<boolean> {
    return await this.appService.goWorkStrategy();
  }
}
