import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/domain/repository/user.repository';
import {
  CreateUserReqDto,
  CreateUserResDto,
  LoginReqDto,
  LoginResDto,
} from 'src/dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/common/jwt/jwt-payload';
import { ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(data: LoginReqDto): Promise<LoginResDto> {
    const { email, password } = data;
    const user = await this.userRepository.findOneByEmailWithPassword(email);
    if (!user) {
      throw new UnauthorizedException('사용자 이름과 비밀번호를 확인해주세요.');
    }
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      user.password,
    );
    if (!isPasswordValidated) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }
    const jwtPayload: JwtPayload = { email, sub: user.id };
    const expiresIn = Number(process.env.JWT_ACCESS_TOKEN_EXPIRES);
    const accessToken = this.jwtService.sign(jwtPayload, { expiresIn });
    return new LoginResDto(accessToken, user);
  }

  async signUp(userData: CreateUserReqDto): Promise<CreateUserResDto> {
    const user = this.userRepository.create(userData);
    user.password = await bcrypt.hash(userData.password, 10);
    const newUser = await this.userRepository.save(user);
    return new CreateUserResDto(newUser);
  }

  decodeToken(req: Request): JwtPayload {
    const tokenFunction = ExtractJwt.fromAuthHeaderAsBearerToken();
    try {
      const token = tokenFunction(req);
      return this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET_KEY'),
      });
    } catch (error) {
      return null;
    }
  }
}
