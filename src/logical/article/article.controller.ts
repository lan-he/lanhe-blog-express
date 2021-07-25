import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ApiTags } from '@nestjs/swagger';
@Controller('article')
@ApiTags('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  // @UseGuards(new RbacGuard(role.DEVELOPER))
  // @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async createArticle(@Body() body: any) {
    return await this.articleService.createArticle(body);
  }
}
