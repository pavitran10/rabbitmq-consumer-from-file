import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export type RawDataObjectDocument = RawDataObject & Document;

//class name to be changed a standard class name,
@Schema({ collection: 'hse-events' })
export class RawDataObject {
  @Prop()
  createTime: Date;

  @Prop()
  updateTime: Date;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  payload: Record<string, unknown>;

  @Prop({ type: Boolean, default: false })
  isProcessed: boolean;

  _id: string;
}

export const rawDataSchema = SchemaFactory.createForClass(RawDataObject);
