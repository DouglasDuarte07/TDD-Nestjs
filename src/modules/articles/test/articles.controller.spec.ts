import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesController } from '../articles.controller';
import { ArticlesService } from '../articles.service';

import { MongoMemoryServer } from 'mongodb-memory-server';
import { getModelToken } from '@nestjs/mongoose';
import { Connection, connect, Model } from 'mongoose';

import { Article, ArticleSchema } from '../entity/articles.entity';

import { ArticleDTOStub, ArticleDTOStubUpdate } from './stubs/article.dto.stub';

import { ArticlesRepository } from '../articles.repository';
import { ArticleProfile } from '../profile/article.profile';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

describe('Articles ', () => {
  let articlesController: ArticlesController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let articleModel: Model<Article>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    articleModel = mongoConnection.model(Article.name, ArticleSchema);

    const app: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesController],
      imports: [AutomapperModule.forRoot({ strategyInitializer: classes() })],
      providers: [
        ArticlesRepository,
        ArticlesService,
        ArticleProfile,
        { provide: getModelToken(Article.name), useValue: articleModel },
      ],
    }).compile();
    articlesController = app.get<ArticlesController>(ArticlesController);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  //Tests

  describe('Criando artigo', () => {
    it('Salvando um arquivo', async () => {
      const createdArticle = await articlesController.postArticle(
        ArticleDTOStub(),
      );
      expect(createdArticle.title).toBe(ArticleDTOStub().title);
    });
    it('Salvando um arquivo com título já existente', async () => {
      await new articleModel(ArticleDTOStub()).save();
      await expect(
        articlesController.postArticle(ArticleDTOStub()),
      ).rejects.toThrow('Artigo já existente');
    });
  });

  describe('Atualizando artigo', () => {
    it('Att com sucesso', async () => {
      const createdArticle = await articlesController.postArticle(
        ArticleDTOStub(),
      );
      const updated = await articlesController.update(
        String(createdArticle._id),
        ArticleDTOStubUpdate,
      );
      delete updated._id;
      delete updated.createdAt;
      delete updated.updatedAt;
      expect(updated).toEqual(ArticleDTOStubUpdate);
    });

    it('Não encontrando um arquivo', async () => {
      await expect(
        articlesController.update('63655f9628313f3db1475c87', {}),
      ).rejects.toThrow('Item não encontrado');
    });
  });

  // describe('getArticle', () => {
  //   it('should return the corresponding saved object', async () => {
  //     await new articleModel(ArticleDTOStub()).save();
  //     const article = await articlesController.getArticle(
  //       ArticleDTOStub().title,
  //     );
  //     expect(article.title).toBe(ArticleDTOStub().title);
  //   });
  //   it('should return null', async () => {
  //     const article = await articlesController.getArticle(
  //       ArticleDTOStub().title,
  //     );
  //     expect(article).toBeNull();
  //   });
  // });
});
