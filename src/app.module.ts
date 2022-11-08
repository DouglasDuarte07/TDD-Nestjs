import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './modules/articles/articles.module';

@Module({
  imports: [
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@test.utxkhv5.mongodb.net/test',
    ),
    ArticlesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
