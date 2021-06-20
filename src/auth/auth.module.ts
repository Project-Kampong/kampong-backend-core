import { Module } from '@nestjs/common';
import { UserModule } from 'src/users/user.module';
import { AuthController } from './auth.controller';
import AuthService from './auth.service';

@Module({
  controllers: [AuthController],
  imports: [UserModule],
  providers: [AuthService],
})
export class AuthModule {}
