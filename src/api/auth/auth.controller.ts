import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { User } from 'src/domain/entity';
import { JwtAuthGuard } from 'src/common/jwt/jwt-auth-guard';
import { CreateUserReqDto, LoginReqDto } from 'src/dto';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/test')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async test(@GetUser() user: User) {
    console.log('user', user);
  }

  @Post('/signIn')
  @ApiOperation({ summary: '로그인' })
  @ApiBody({ type: LoginReqDto })
  async signIn(@Body() user: LoginReqDto) {
    return this.authService.signIn(user);
  }

  @Post('/signUp')
  @ApiOperation({ summary: '회원 가입' })
  @ApiBody({ type: CreateUserReqDto })
  async signUp(@Body() user: CreateUserReqDto) {
    return this.authService.signUp(user);
  }
}
