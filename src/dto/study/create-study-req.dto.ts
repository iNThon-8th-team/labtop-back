import { IsDefined, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudyReqDto {
  @IsDefined()
  @IsString()
  @ApiProperty({ description: '제목' })
  title: string;

  @IsDefined()
  @IsString()
  @ApiProperty({ description: '내용' })
  content: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '논문 링크' })
  link: string;
}
