import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './logical/user/user.module';
import { UserController } from './logical/user/user.controller';
// import { AuthService } from './logical/auth/auth.service';
import { AuthModule } from './logical/auth/auth.module';
@Module({
  imports: [UserModule, AuthModule],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
