import { Injectable } from '@nestjs/common';
import * as xlxs from 'xlsx';
import * as amqp from 'amqplib';

@Injectable()
export class AppService {
  async sendDataIntoRabbitMq() {
    const excelFilePath =
      process.cwd() +
      '/' +
      process.env.FILE_FOLDER_PATH +
      '/' +
      process.env.FILE_NAME;
    const file = xlxs.readFile(excelFilePath);
    const sheet = file.Sheets[process.env.SHEET_NAME];
    const data = xlxs.utils.sheet_to_json(sheet, { raw: false });
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(process.env.RABBITMQ_QUEUE);
    for (const object of data) {
      //console.log(object);
      object['attributes'] = {
        bxM3Ready: object['attributes.bxM3Ready'].toLowerCase() === 'true',
      };
      delete object['attributes.bxM3Ready'];
      console.log(object);
      console.log(111111);
      await channel.sendToQueue(
        process.env.RABBITMQ_QUEUE,
        Buffer.from(JSON.stringify(object)),
      );
    }
  }
}
