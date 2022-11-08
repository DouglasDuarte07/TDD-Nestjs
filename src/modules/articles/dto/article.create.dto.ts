import { AutoMap } from '@automapper/classes';

export class CreateArticleDTO {
  @AutoMap()
  title: string;

  @AutoMap()
  authorName: string;

  @AutoMap()
  body: string;
}
