import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetBoardReqDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '연구실 이름' })
  labName?: string;

  // 연구실 이름, 교수님 성함
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '제목' })
  title?: string;

  // 연구실 이름, 교수님 성함
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '작성자' })
  author?: string;
}
