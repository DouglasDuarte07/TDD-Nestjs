import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesController } from './articles.controller';
import { ArticlesRepository } from './articles.repository';
import { ArticlesService } from './articles.service';
import { Article, ArticleSchema } from './entity/articles.entity';
import { ArticleProfile } from './profile/article.profile';

@Module({
  imports: [
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
    MongooseModule.forFeature([
      {
        name: Article.name,
        schema: ArticleSchema,
      },
    ]),
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService, ArticleProfile, ArticlesRepository],
})
export class ArticlesModule {}
