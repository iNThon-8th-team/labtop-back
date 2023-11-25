import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsOptional, IsString } from 'class-validator';
import { category } from 'src/common/enum';
export class CreateLabReqDto {
  @IsDefined()
  @IsString()
  @ApiProperty({ description: '연구실 이름' })
  name!: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '연구실 소개' })
  introduction?: string;

  @IsDefined()
  @IsEnum(category)
  @ApiProperty({ description: '연구실 카테고리' })
  category!: category;
}
