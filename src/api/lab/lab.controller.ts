import {
  Query,
  Controller,
  Body,
  Post,
  Put,
  Get,
  UseGuards,
  Param,
  Req,
} from '@nestjs/common';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { User } from 'src/domain/entity';
import { JwtAuthGuard } from 'src/common/jwt/jwt-auth-guard';
import {
  CreateLabReqDto,
  GetLabDetailResDto,
  GetLabListReqDto,
  GetLabListResDto,
  OkResDto,
} from 'src/dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { LabService } from './lab.service';
import { UpdateLabReqDto } from 'src/dto/lab/update-lab-req.dto';
import { AuthService } from '../auth/auth.service';
import { Request } from 'express';

@Controller('lab')
export class LabController {
  constructor(
    private labService: LabService,
    private authService: AuthService,
  ) {}

  @Get()
  @ApiQuery({ type: GetLabListReqDto })
  @ApiOkResponse({ type: [GetLabListResDto] })
  @ApiOperation({ summary: '연구실 목록 가져오기' })
  async getLabList(
    @Query() query: GetLabListReqDto,
  ): Promise<GetLabListResDto[]> {
    return this.labService.getLabList(query);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: OkResDto })
  @ApiOperation({ summary: '연구실 생성하기' })
  async createLab(
    @GetUser() user: User,
    @Body() lab: CreateLabReqDto,
  ): Promise<OkResDto> {
    return this.labService.createLab(lab, user.id);
  }

  @Put()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: OkResDto })
  @ApiOperation({ summary: '연구실 수정하기' })
  async updateLab(
    @GetUser() user: User,
    @Body() lab: UpdateLabReqDto,
  ): Promise<OkResDto> {
    return this.labService.updateLab(lab, user.id);
  }

  @Get('/:labId')
  @ApiOkResponse({ type: GetLabDetailResDto })
  @ApiOperation({ summary: '연구실 상세 정보 가져오기' })
  async getLabDetail(
    @Param('labId') labId: number,
    @Req() request: Request,
  ): Promise<GetLabDetailResDto> {
    const token = this.authService.decodeToken(request);
    return this.labService.getLabDetail(labId, token?.sub);
  }

  @Put('/:labId/join')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: OkResDto })
  @ApiOperation({ summary: '연구실 가입하기' })
  async joinLab(
    @Param('labId') labId: number,
    @GetUser() user: User,
  ): Promise<OkResDto> {
    return this.labService.joinLab(labId, user.id);
  }

  @Get('/my')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: [GetLabListResDto] })
  @ApiOperation({ summary: '내 연구실 가져오기' })
  async getMyLab(@GetUser() user: User): Promise<GetLabListResDto[]> {
    return this.labService.getMyLab(user.id);
  }
}
