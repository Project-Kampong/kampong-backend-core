import { Module } from '@nestjs/common';
import { userController } from './user.controller';
import { authService } from './auth.service';
import { userProviders } from './user.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [userController],
  providers: [authService, ...userProviders],
})
export class UserModule {}
