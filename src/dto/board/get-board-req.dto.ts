import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { category } from 'src/common/enum';

export class GetBoardReqDto {
  @IsOptional()
  @IsBoolean()
  @ApiProperty({ description: '구독 여부' })
  subscribe?: boolean;

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

  @IsOptional()
  @IsEnum(category)
  @ApiProperty({ description: '작성자' })
  category?: category;
}
