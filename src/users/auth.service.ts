import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { sign } from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './schemas/user.schema';
import { UserLoginDTO } from './dtos/user.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class authService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  public async login(userLoginDTO: UserLoginDTO) {
    const loginUser = await this.userModel.findOne({
      username: userLoginDTO.username,
    });
    if (!loginUser) {
      throw new Error('User does not exist');
    }
    const isEqual = this.checkPassword(
      userLoginDTO.password,
      userLoginDTO.password,
    );
    if (!isEqual) {
      throw new Error('Password is incorrect');
    }
    const token = this.getSignedJwtToken(loginUser);
    return {
      userId: loginUser._id,
      token: token,
      tokenExpiration: process.env.JWT_EXPIRE,
    };
  }

  private getSignedJwtToken(loginUser) {
    sign(
      { userId: loginUser._id, userEmail: loginUser.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE,
      },
    );
  }

  private async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  private async checkPassword(inputPassword: string, originalPassword: string) {
    await bcrypt.compare(inputPassword, originalPassword);
  }
}

export default authService;
