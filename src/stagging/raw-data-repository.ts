import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RawDataObject } from './schema/raw-data-object.schema';

@Injectable()
export class RawDataRepository {
  constructor(
    @InjectModel(RawDataObject.name)
    private _rawDataModel: Model<RawDataObject>,
  ) {}

  async findAll(): Promise<RawDataObject[]> {
    return await this._rawDataModel.find();
  }
}
