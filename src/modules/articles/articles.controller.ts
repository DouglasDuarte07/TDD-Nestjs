import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FindResponseProps } from './articles.repository';
import { ArticlesService } from './articles.service';
import { CreateArticleDTO } from './dto/article.create.dto';
import { ReadArticleDTO } from './dto/article.read.dto';
import { UpdateArticleDTO } from './dto/article.update.dto';

@Controller()
export class ArticlesController {
  constructor(private readonly appService: ArticlesService) {}

  @Post('article')
  postArticle(@Body() article: CreateArticleDTO) {
    return this.appService.postArticle(article);
  }

  @Get('article')
  findAll(): Promise<ReadArticleDTO[] | FindResponseProps> {
    return this.appService.findAll();
  }

  @Get('article/:id')
  findById(@Param('id') id: string): Promise<ReadArticleDTO> {
    return this.appService.findById(id);
  }
  @Put('article/:id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateArticleDTO,
  ): Promise<ReadArticleDTO> {
    return this.appService.update(id, body);
  }
  @Delete('article/:id')
  delete(@Param('id') id: string): Promise<ReadArticleDTO> {
    return this.appService.delete(id);
  }
}
