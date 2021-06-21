import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserInput } from './dto/update-user.input';
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

  async updateUserById(userId: string, updateBody: UpdateUserInput) {
    return this.userModel
      .findByIdAndUpdate(userId, updateBody, { new: true, runValidators: true })
      .lean()
      .exec();
  }

  async deleteUserById(userId: string) {
    return this.userModel.findByIdAndDelete(userId).lean().exec();
  }
}
