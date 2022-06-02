// import { Controller, Post } from '@nestjs/common';
// import { AppService } from './app.service';
// import { ApiTags } from '@nestjs/swagger';
// import { IAgentStatus } from './inputs';

// @ApiTags('Chat Bot Switcher')
// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) {}

//   @Post('work-mode')
//   async goWorkMode(): Promise<boolean> {
//     return await this.appService.goWorkMode();
//   }

//   @Post('endOfwork-mode')
//   async goEndOfworkMode(): Promise<boolean> {
//     return await this.appService.goEndOfworkMode();
//   }

//   @Post('Bots-Status')
//   async getBotsStaus(): Promise<IAgentStatus[]> {
//     return await this.appService.getBotsStatus();
//   }
// }
