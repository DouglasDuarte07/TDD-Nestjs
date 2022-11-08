/* istanbul ignore file */
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  createMap,
  forMember,
  ignore,
  mapFrom,
  Mapper,
  MappingProfile,
} from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Article } from '../entity/articles.entity';
import { ReadArticleDTO } from '../dto/article.read.dto';
import { CreateArticleDTO } from '../dto/article.create.dto';

@Injectable()
export class ArticleProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, Article, ReadArticleDTO);
      createMap(mapper, CreateArticleDTO, Article);
    };
  }
}
