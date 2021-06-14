import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { sign } from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from '../users/schemas/user.schema';
import { UserLoginDto } from './dtos/userLogin.dto';
import { UserRegisterDto } from './dtos/userRegister.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async userLogin(username: string, password: string): Promise<UserLoginDto> {
    const loginUser = await this.userModel
      .findOne({
        username,
      })
      .lean()
      .exec();

    if (!loginUser) {
      throw new NotFoundException('User does not exist');
    }
    const isEqual = await this.checkPassword(password, loginUser.password);
    if (!isEqual) {
      throw new BadRequestException('Password is incorrect');
    }
    const token = this.getSignedJwtToken(loginUser);
    return {
      userId: loginUser._id,
      token,
      tokenExpiration: process.env.JWT_EXPIRE,
    };
  }

  async userRegister(
    username: string,
    email: string,
    password: string,
  ): Promise<UserRegisterDto> {
    const userExists = await this.userModel
      .find({ $or: [{ username }, { email }] })
      .lean()
      .exec();
    if (userExists) {
      throw new BadRequestException('Email or username already exists');
    }

    const newUser = await this.userModel.create({
      username,
      email,
      password: await this.hashPassword(password),
    });

    const token = this.getSignedJwtToken(newUser);
    return {
      userId: newUser._id,
      token,
      tokenExpiration: process.env.JWT_EXPIRE,
    };
  }

  private getSignedJwtToken(loginUser: User) {
    return sign(
      { userId: loginUser._id, userEmail: loginUser.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE,
      },
    );
  }

  private async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hash(password, salt);
    return hashedPassword;
  }

  private checkPassword(inputPassword: string, originalPassword: string) {
    return bcrypt.compare(inputPassword, originalPassword);
  }
}

export default AuthService;
