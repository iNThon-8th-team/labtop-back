import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/jwt/jwt-auth-guard';
import { OkResDto } from 'src/dto';
import { ImageService } from './image.service';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { User } from 'src/domain/entity';

@Controller('image')
export class ImageController {
  constructor(private imageService: ImageService) {}
  @Post('user')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: OkResDto })
  @ApiOperation({ summary: '유저 이미지 업로드' })
  @UseInterceptors(FileInterceptor('image'))
  async fileUploadUser(
    @UploadedFile() file: Express.Multer.File,
    @Body('id') id: number,
    @GetUser() user: User,
  ): Promise<OkResDto> {
    console.log(file);
    return await this.imageService.uploadUserImage(file.path, user.id, id);
  }

  @Post('lab')
  @UseInterceptors(FileInterceptor('image'))
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: OkResDto })
  @ApiOperation({ summary: '연구실 이미지 업로드' })
  async fileUploadLab(
    @UploadedFile() file: Express.Multer.File,
    @Body('id') id: number,
    @GetUser() user: User,
  ): Promise<OkResDto> {
    console.log(file);
    return await this.imageService.uploadLabImage(file.path, user.id, id);
  }
}
