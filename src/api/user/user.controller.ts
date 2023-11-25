import { Controller, Body, UseGuards, Param, Put, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/jwt/jwt-auth-guard';
import { GetUserResDto, OkResDto, UpdateUserReqDto } from 'src/dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { User } from 'src/domain/entity';
import { UserService } from './user.services';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:userId')
  @ApiOkResponse({ type: GetUserResDto })
  @ApiOperation({ summary: '사용자 정보 가져오기' })
  async getUser(@Param('userId') userId: number): Promise<GetUserResDto> {
    return this.userService.getUser(userId);
  }

  @Put()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: UpdateUserReqDto })
  @ApiOkResponse({ type: OkResDto })
  @ApiOperation({ summary: '사용자 정보 수정하기' })
  async updateUser(
    @Body() study: UpdateUserReqDto,
    @GetUser() user: User,
  ): Promise<OkResDto> {
    return this.userService.updateUser(study, user.id);
  }
}
