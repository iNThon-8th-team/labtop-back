import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { User } from 'src/domain/entity';
import { JwtAuthGuard } from 'src/common/jwt/jwt-auth-guard';
import {
  CreateUserReqDto,
  CreateUserResDto,
  LoginReqDto,
  LoginResDto,
} from 'src/dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/test')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async test(@GetUser() user: User): Promise<void> {
    console.log('user', user);
  }

  @Post('/signIn')
  @ApiOperation({ summary: '로그인' })
  @ApiBody({ type: LoginReqDto })
  @ApiOkResponse({ type: LoginResDto })
  async signIn(@Body() user: LoginReqDto): Promise<LoginResDto> {
    return this.authService.signIn(user);
  }

  @Post('/signUp')
  @ApiOperation({ summary: '회원 가입' })
  @ApiBody({ type: CreateUserReqDto })
  @ApiOkResponse({ type: CreateUserResDto })
  async signUp(@Body() user: CreateUserReqDto): Promise<CreateUserResDto> {
    return this.authService.signUp(user);
  }
}
