import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { isEmpty } from 'lodash';
import { User } from '../users/schemas/user.schema';
import { UserLoginDto } from './dto/userLogin.dto';
import { UserRegisterDto } from './dto/userRegister.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserLoginDto> {
    const loginUser = await this.usersService.findUserByUsername(username);

    const isValidUsernameAndPassword =
      !isEmpty(loginUser) &&
      (await this.checkPassword(password, loginUser.password));
    if (!isValidUsernameAndPassword) {
      throw new BadRequestException('Username or password is incorrect');
    }
    const token = this.getSignedJwtToken(loginUser);
    return {
      userId: loginUser._id,
      username: loginUser.username,
      token,
      tokenExpiration: process.env.JWT_EXPIRE,
    };
  }

  async userRegister(
    username: string,
    email: string,
    password: string,
  ): Promise<UserRegisterDto> {
    const userExists = await this.usersService.checkUsernameOrEmailExist(
      username,
      email,
    );
    if (userExists) {
      throw new BadRequestException('Email or username already exists');
    }

    const hashedPassword = await this.hashPassword(password);

    const newUser = await this.usersService.createUser(
      username,
      email,
      hashedPassword,
    );

    const token = this.getSignedJwtToken(newUser);
    return {
      userId: newUser._id,
      username: newUser.username,
      token,
      tokenExpiration: process.env.JWT_EXPIRE,
    };
  }

  private getSignedJwtToken(loginUser: User) {
    const payload = { userId: loginUser._id, userEmail: loginUser.email };
    return this.jwtService.sign(payload);
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
