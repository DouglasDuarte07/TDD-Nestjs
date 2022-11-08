import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PopulateOptions } from 'mongoose';
import { CreateArticleDTO } from './dto/article.create.dto';
import { ReadArticleDTO } from './dto/article.read.dto';
import { Article } from './entity/articles.entity';

export interface PaginationProps {
  limit: number;
  total: number;
  skip: number;
}

export interface FindProps {
  filter: object;
  pagination?: PaginationProps;
  populate?: string | string[] | PopulateOptions | PopulateOptions[];
  sort?: object | string;
}

export interface FindResponseProps {
  pagination: PaginationProps;
  articles: ReadArticleDTO[];
}
@Injectable()
export class ArticlesRepository {
  constructor(
    @InjectModel(Article.name) private readonly articleModel: Model<Article>,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}

  async create(createArticleDto: CreateArticleDTO): Promise<ReadArticleDTO> {
    try {
      const article = await this.articleModel.create({
        ...createArticleDto,
      });
      return this.classMapper.map(article, Article, ReadArticleDTO);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(query: object): Promise<ReadArticleDTO> {
    try {
      return this.classMapper.map(
        await this.articleModel.findOne(query),
        Article,
        ReadArticleDTO,
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async find(_query: FindProps): Promise<ReadArticleDTO[] | FindResponseProps> {
    let articles = [];
    let pagination: PaginationProps = null;

    const options = {
      ...(_query.pagination && _query.pagination),
      ...(_query.sort && { sort: _query.sort }),
      ...(_query.populate && { populate: _query.populate }),
    };
    try {
      articles = await this.articleModel
        .find(_query.filter, null, options)
        .sort({ createdAt: -1 });

      if (_query.pagination) {
        pagination = {
          ..._query.pagination,
          total: await this.articleModel.countDocuments(_query.filter),
        };
      }

      if (_query.pagination) {
        return { articles, pagination };
      } else {
        return this.classMapper.mapArray(articles, Article, ReadArticleDTO);
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updadeArticle): Promise<ReadArticleDTO | null> {
    let article = null;

    try {
      article = await this.articleModel.findByIdAndUpdate(id, updadeArticle, {
        new: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return this.classMapper.map(article, Article, ReadArticleDTO);
  }

  async delete(id: string): Promise<ReadArticleDTO> {
    let article = null;

    try {
      article = await this.articleModel.findByIdAndDelete(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    if (!article) {
      throw new NotFoundException('Item não encontrado');
    }

    return this.classMapper.map(article, Article, ReadArticleDTO);
  }
}
