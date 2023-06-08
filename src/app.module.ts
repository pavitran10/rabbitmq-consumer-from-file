import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StagingService } from './stagging/staging.service';
import {
  RawDataObject,
  rawDataSchema,
} from './stagging/schema/raw-data-object.schema';
import { RawDataRepository } from './stagging/raw-data-repository';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URL),
    MongooseModule.forFeature([
      {
        name: RawDataObject.name,
        schema: rawDataSchema,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, StagingService, RawDataRepository],
})
export class AppModule {}
