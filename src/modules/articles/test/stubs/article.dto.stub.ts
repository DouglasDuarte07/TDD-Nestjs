import { CreateArticleDTO } from '../../dto/article.create.dto';

export const ArticleDTOStub = (): CreateArticleDTO => {
  return {
    title: 'This is the title of the article',
    authorName: 'Vinicius Santos de Pontes',
    body: 'This is a stub for testing',
  };
};

export const ArticleDTOStubUpdate = {
  title: 'Title article',
  authorName: 'Vinicius Santos de Pontes',
  body: 'This is a stub for testing',
};
