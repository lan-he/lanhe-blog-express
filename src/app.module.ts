import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './logical/user/user.module';
import { UserController } from './logical/user/user.controller';
import { AuthModule } from './logical/auth/auth.module';
import { CommodityModule } from './logical/commodity/commodity.module';
import { CommodityController } from './logical/commodity/commodity.controller';
@Module({
  imports: [UserModule, AuthModule, CommodityModule],
  controllers: [AppController, UserController, CommodityController],
  providers: [AppService],
})
export class AppModule {}
