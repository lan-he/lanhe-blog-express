import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './logical/user/user.module';
import { UserController } from './logical/user/user.controller';
import { AuthModule } from './logical/auth/auth.module';
import { CommodityModule } from './logical/commodity/commodity.module';
import { CommodityController } from './logical/commodity/commodity.controller';
import { ArticleController } from './logical/article/article.controller';
import { ArticleModule } from './logical/article/article.module';
@Module({
  imports: [UserModule, AuthModule, CommodityModule, ArticleModule],
  controllers: [
    AppController,
    UserController,
    CommodityController,
    ArticleController,
  ],
  providers: [AppService],
})
export class AppModule {}
