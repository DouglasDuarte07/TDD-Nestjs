import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateArticleDTO } from './dto/article.create.dto';
import { ArticlesRepository, FindResponseProps } from './articles.repository';
import { ReadArticleDTO } from './dto/article.read.dto';
import { UpdateArticleDTO } from './dto/article.update.dto';

@Injectable()
export class ArticlesService {
  constructor(private readonly articlesRepository: ArticlesRepository) {}

  async postArticle(article: CreateArticleDTO) {
    const existingArticle = await this.articlesRepository.findOne({
      title: article.title,
    });
    if (existingArticle) {
      throw new InternalServerErrorException('Artigo já existente');
    }
    const createdArticle = await this.articlesRepository.create(article);
    return createdArticle as ReadArticleDTO;
  }

  async findById(_id: string): Promise<ReadArticleDTO> {
    const article = await this.articlesRepository.findOne({ _id });
    return article;
  }

  async findAll(): Promise<ReadArticleDTO[] | FindResponseProps> {
    const articles = await this.articlesRepository.find({ filter: {} });
    return articles;
  }

  async update(_id: string, updateArticleDTO: UpdateArticleDTO) {
    const article = await this.articlesRepository.update(_id, updateArticleDTO);

    if (!article) {
      throw new NotFoundException('Item não encontrado');
    }
    return article;
  }

  async delete(_id: string): Promise<ReadArticleDTO> {
    const article = await this.articlesRepository.delete(_id);
    return article;
  }
}
