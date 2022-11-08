import { Document, Schema as MongooseSchema } from 'mongoose';
import { AutoMap } from '@automapper/classes';

export class BaseEntity extends Document {
  @AutoMap()
  _id: MongooseSchema.Types.ObjectId;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  updatedAt: Date;
}
