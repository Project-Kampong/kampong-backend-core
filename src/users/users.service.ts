import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async list() {
    return this.userModel.find();
  }

  async findUserById(userId: string) {
    return this.userModel.findById(userId);
  }

  async deleteById(userId: string) {
    return this.userModel.findByIdAndDelete(userId);
  }
}
