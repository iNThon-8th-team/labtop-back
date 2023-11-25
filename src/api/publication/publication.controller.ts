import { Controller, Body, UseGuards, Post, Get, Param } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/jwt/jwt-auth-guard';
import {
  CreatePublicationReqDto,
  GetPublicationDetailResDto,
  GetPublicationListResDto,
  OkResDto,
} from 'src/dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { User } from 'src/domain/entity';
import { PublicationService } from './publication.service';

@Controller('publication')
export class PublicationController {
  constructor(private publicationService: PublicationService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CreatePublicationReqDto })
  @ApiOkResponse({ type: OkResDto })
  @ApiOperation({ summary: '논문 등록하기' })
  async createPublication(
    @Body() publication: CreatePublicationReqDto,
    @GetUser() user: User,
  ): Promise<OkResDto> {
    return this.publicationService.createPublication(publication, user.id);
  }

  @Get('/:publicationId')
  @ApiOkResponse({ type: GetPublicationDetailResDto })
  @ApiOperation({ summary: '논문 가져오기' })
  async getPublication(
    @Param('publicationId') publicationId: number,
  ): Promise<GetPublicationDetailResDto> {
    return this.publicationService.getPublication(publicationId);
  }

  @Get('/list/:labId')
  @ApiOkResponse({ type: GetPublicationListResDto })
  @ApiOperation({ summary: '논문 목록 가져오기' })
  async getPublicationList(
    @Param('labId') labId: number,
  ): Promise<GetPublicationListResDto[]> {
    return this.publicationService.getPublicationList(labId);
  }
}
