import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async list(showPassword = false) {
    if (showPassword) {
      return this.userModel.find().lean().exec();
    }
    return this.userModel.find().select('-password').lean().exec();
  }

  async findUserById(userId: string) {
    return this.userModel.findById(userId).lean().exec();
  }

  async deleteUserById(userId: string) {
    return this.userModel.findByIdAndDelete(userId).lean().exec();
  }
}
