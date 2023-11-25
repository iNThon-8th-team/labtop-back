import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
export class UpdateUserReqDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '소개글' })
  introduction?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '이름' })
  username?: string;
}
