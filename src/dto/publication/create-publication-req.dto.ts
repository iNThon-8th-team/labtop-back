import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsOptional, IsString } from 'class-validator';
export class CreatePublicationReqDto {
  @IsDefined()
  @IsString()
  @ApiProperty({ description: '제목' })
  title!: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '논문 요약' })
  content?: string;

  @IsDefined()
  @IsString()
  @ApiProperty({ description: '논문 링크' })
  link!: string;
}
