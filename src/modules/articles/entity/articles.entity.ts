import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AutoMap } from '@automapper/classes';
import { BaseEntity } from './base.entity';

@Schema({ timestamps: true })
export class Article extends BaseEntity {
  @Prop()
  @AutoMap()
  title: string;

  @Prop()
  @AutoMap()
  authorName: string;

  @Prop()
  @AutoMap()
  body: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
