import { AutoMap } from '@automapper/classes';

export class UpdateArticleDTO {
  @AutoMap()
  title?: string;

  @AutoMap()
  authorName?: string;

  @AutoMap()
  body?: string;
}
