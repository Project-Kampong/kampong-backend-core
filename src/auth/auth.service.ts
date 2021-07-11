import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CookieOptions, Response as ExpressResponse } from 'express';
import { isEmpty } from 'lodash';
import { User } from '../users/schemas/user.schema';
import { UserRegisterDto } from './dto/userRegister.dto';
import { UsersService } from '../users/users.service';
import { UserLoginDto } from './dto/userLogin.dto';
import { JwtPayload } from './auth.entity';

@Injectable()
export class AuthService {
  private readonly jwtDuration: number;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtDuration = parseInt(this.configService.get('JWT_DURATION'));
  }

  async authenticateUser(username: string, password: string): Promise<User> {
    const loginUser = await this.usersService.findUserByUsername(username);
    const isValidUsernameAndPassword =
      !isEmpty(loginUser) &&
      (await this.checkPassword(password, loginUser.password));
    if (!isValidUsernameAndPassword) {
      throw new BadRequestException('Username or password is incorrect');
    }
    return loginUser;
  }

  login(userId: string, username: string, res: ExpressResponse): UserLoginDto {
    const token = this.getSignedJwtToken(userId, username);
    // set httpOnly and secure cookie options to true if in production
    const isSecureCookie = this.configService.get('NODE_ENV') === 'production';
    const tokenExpiry = new Date(Date.now() + this.jwtDuration);
    const cookieOptions: CookieOptions = {
      httpOnly: isSecureCookie,
      expires: tokenExpiry,
      secure: isSecureCookie,
    };
    res.cookie('token', token, cookieOptions);

    return {
      userId,
      username,
      token,
      tokenExpiration: tokenExpiry,
    };
  }

  async register(
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

    const token = this.getSignedJwtToken(newUser._id, newUser.username);
    const tokenExpiry = new Date(Date.now() + this.jwtDuration);

    return {
      userId: newUser._id,
      username: newUser.username,
      token,
      tokenExpiration: tokenExpiry,
    };
  }

  private getSignedJwtToken(userId: string, username: string) {
    const payload: JwtPayload = {
      userId,
      username,
    };
    return this.jwtService.sign(payload);
  }

  private async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hash(password, salt);
    return hashedPassword;
  }

  private checkPassword(inputPassword: string, originalPassword: string) {
    return bcrypt.compare(inputPassword, originalPassword);
  }
}
