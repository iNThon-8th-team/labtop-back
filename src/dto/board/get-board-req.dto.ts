import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetBoardReqDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: '연구실 번호' })
  labId?: number;

  // 연구실 이름, 교수님 성함
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '검색어' })
  search?: string;
}
