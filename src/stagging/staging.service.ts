/* eslint-disable no-underscore-dangle */
import { Injectable } from '@nestjs/common';
import { RawDataRepository } from './raw-data-repository';

@Injectable()
export class StagingService {
  constructor(private _rawDataObjectRepositoryService: RawDataRepository) {}

  async getAllStaggingDocuments() {
    return await this._rawDataObjectRepositoryService.findAll();
  }
}
