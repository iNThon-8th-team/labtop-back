import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { category } from 'src/common/enum';
export class GetLabListReqDto {
  @IsOptional()
  @IsEnum(category)
  @ApiProperty({ description: '연구실 카테고리' })
  category?: category;

  // 연구실 이름, 교수님 성함
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '검색어' })
  search?: string;
}
