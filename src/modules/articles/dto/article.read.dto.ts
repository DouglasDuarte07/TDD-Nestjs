import { AutoMap } from '@automapper/classes';
import { Schema as MongooseSchema } from 'mongoose';

export class ReadArticleDTO {
  @AutoMap()
  title: string;

  @AutoMap()
  authorName: string;

  @AutoMap()
  body: string;

  @AutoMap()
  _id: MongooseSchema.Types.ObjectId;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  updatedAt: Date;
}
