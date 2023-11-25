import { Query, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { User } from 'src/domain/entity';
import { JwtAuthGuard } from 'src/common/jwt/jwt-auth-guard';
import { GetLabListReqDto } from 'src/dto';
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { LabService } from './lab.service';

@Controller('lab')
export class LabController {
  constructor(private labService: LabService) {}

  @Get()
  @ApiQuery({ type: GetLabListReqDto })
  @ApiOperation({ summary: '연구실 목록 가져오기' })
  async getLabList(@Query() query: GetLabListReqDto) {
    return this.labService.getLabList(query);
  }

  @Post('/test')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async test(@GetUser() user: User): Promise<void> {
    console.log('user', user);
  }
}
