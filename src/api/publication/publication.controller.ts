import { Controller, Body, UseGuards, Post } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/jwt/jwt-auth-guard';
import { CreatePublicationReqDto, OkResDto } from 'src/dto';
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
  @ApiBody({ type: [CreatePublicationReqDto] })
  @ApiOkResponse({ type: OkResDto })
  @ApiOperation({ summary: '논문 등록하기' })
  async createPublication(
    @Body() publications: CreatePublicationReqDto[],
    @GetUser() user: User,
  ): Promise<OkResDto> {
    return this.publicationService.createPublication(publications, user.id);
  }
}
