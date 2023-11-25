import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/domain/repository/user.repository';
import { CreateUserReqDto, LoginReqDto } from 'src/dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/common/jwt/jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signIn(data: LoginReqDto) {
    const { username, password } = data;
    const user = await this.userRepository.findOneByUsernameWithPassword(
      username,
    );
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
    const payload: JwtPayload = { username, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async signUp(userData: CreateUserReqDto) {
    const newUser = this.userRepository.create(userData);
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    newUser.password = hashedPassword;
    await this.userRepository.save(newUser);
    return newUser;
  }
}
