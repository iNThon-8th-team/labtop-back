import {
  Controller,
  Body,
  Post,
  UseGuards,
  Param,
  Put,
  Get,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/jwt/jwt-auth-guard';
import {
  CreateStudyReqDto,
  GetStudyResDto,
  OkResDto,
  UpdateStudyReqDto,
} from 'src/dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { StudyService } from './study.service';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { User } from 'src/domain/entity';

@Controller('study')
export class StudyController {
  constructor(private studyService: StudyService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CreateStudyReqDto })
  @ApiOkResponse({ type: OkResDto })
  @ApiOperation({ summary: '포트폴리오 생성하기' })
  async createStudy(
    @Body() study: CreateStudyReqDto,
    @GetUser() user: User,
  ): Promise<OkResDto> {
    return this.studyService.createStudy(study, user.id);
  }

  @Put()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: UpdateStudyReqDto })
  @ApiOkResponse({ type: OkResDto })
  @ApiOperation({ summary: '포트폴리오 수정하기' })
  async updateStudy(
    @Body() study: UpdateStudyReqDto,
    @GetUser() user: User,
  ): Promise<OkResDto> {
    return this.studyService.updateStudy(study, user.id);
  }

  @Get('/:studyId')
  @ApiOkResponse({ type: GetStudyResDto })
  @ApiOperation({ summary: '포트폴리오 가져오기' })
  async getStudy(@Param('studyId') studyId: number): Promise<GetStudyResDto> {
    return this.studyService.getStudy(studyId);
  }

  @Delete('/:studyId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: OkResDto })
  @ApiOperation({ summary: '포트폴리오 삭제하기' })
  async deleteStudy(
    @Param('studyId') studyId: number,
    @GetUser() user: User,
  ): Promise<OkResDto> {
    return this.studyService.deleteStudy(studyId, user.id);
  }
}
