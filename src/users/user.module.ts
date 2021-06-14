import { Module } from '@nestjs/common';
import { userController } from './user.controller';
import { authService } from './auth.service';
import { User, UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [userController],
  providers: [authService],
})
export class UserModule {}
