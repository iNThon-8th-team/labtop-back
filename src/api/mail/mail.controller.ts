import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MailService } from './mail.service';
import { GetMailReqDto, GetMailResDto, OkResDto } from 'src/dto';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/jwt/jwt-auth-guard';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { User } from 'src/domain/entity';
import { CreateMailReqDto } from 'src/dto/mail/create-mail-req.dto';

@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) {}

  @Get('inbox')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: Promise<GetMailResDto[]> })
  @ApiOperation({ summary: '수신 메시지 목록' })
  async getInbox(@GetUser() user: User): Promise<GetMailResDto[]> {
    //const req = new GetMailReqDto();
    if (!user) throw new BadRequestException('로그인이 필요합니다.');
    return await this.mailService.getMailList({ receiver: user.id });
  }

  @Get('outbox')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: GetMailResDto })
  @ApiOperation({ summary: '송신 메시지 목록' })
  async getOutbox(@GetUser() user: User): Promise<GetMailResDto[]> {
    //const req = new GetMailReqDto();
    if (!user) throw new BadRequestException('로그인이 필요합니다.');
    return await this.mailService.getMailList({ sender: user.id });
  }

  @Post('write')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: OkResDto })
  @ApiOperation({ summary: '메시지 작성' })
  async writeMessage(
    @GetUser() user: User,
    @Body() mail: CreateMailReqDto,
  ): Promise<OkResDto> {
    return this.mailService.writeMessage(user, mail);
  }
}
