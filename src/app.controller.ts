import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  sendDataIntoRabbitMq(@Body() fileData) {
    const fileName = fileData.fileName;
    const sheetName = fileData.sheetName;
    this.appService.sendDataIntoRabbitMq(fileName, sheetName);
  }

  @Post('hse-event')
  sendHseEventsIntoRabbitMq() {
    this.appService.sendHseEventsIntoRabbitMq();
  }
}
