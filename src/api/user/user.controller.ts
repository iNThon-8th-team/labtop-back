import {
  Controller,
  Body,
  UseGuards,
  Param,
  Put,
  Get,
  Post,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/jwt/jwt-auth-guard';
import {
  GetUserResDto,
  OkResDto,
  UpdatePortfolioReqDto,
  UpdateUserReqDto,
} from 'src/dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { User } from 'src/domain/entity';
import { UserService } from './user.services';
import { GetPortfolioResDto } from 'src/dto/user/get-portfolio-res.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/subscribe/:labId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: OkResDto })
  @ApiOperation({ summary: '구독하기' })
  async subscribe(
    @GetUser() user: User,
    @Param('labId') labId: number,
  ): Promise<OkResDto> {
    try {
      return await this.userService.subscribe(labId, user.id);
    } catch (e) {
      console.log(e);
    }
  }

  @Delete('/subscribe/:labId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: OkResDto })
  @ApiOperation({ summary: '구독 취소하기' })
  async unsubscribe(
    @Param('labId') labId: number,
    @GetUser() user: User,
  ): Promise<OkResDto> {
    return await this.userService.unsubscribe(labId, user.id);
  }

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

  @Put('/portfolio')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: UpdatePortfolioReqDto })
  @ApiOkResponse({ type: OkResDto })
  @ApiOperation({ summary: '포트폴리오 수정하기' })
  async updatePortfolio(
    @Body() portfolio: UpdatePortfolioReqDto,
    @GetUser() user: User,
  ): Promise<OkResDto> {
    return this.userService.updatePortfolio(portfolio, user.id);
  }

  @Get('/portfolio/:userId')
  @ApiOkResponse({ type: GetPortfolioResDto })
  @ApiOperation({ summary: '포트폴리오 가져오기' })
  async getPortfolio(
    @Param('userId') userId: number,
  ): Promise<GetPortfolioResDto> {
    return this.userService.getPortfolio(userId);
  }
}
