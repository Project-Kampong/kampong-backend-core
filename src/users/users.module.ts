import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { OrganizedEventsModule } from 'src/organized-events/organized-events.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    OrganizedEventsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersResolver],
  exports: [MongooseModule],
})
export class UsersModule {}
