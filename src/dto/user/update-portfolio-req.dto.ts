import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
export class UpdatePortfolioReqDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '학과' })
  department?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: '학년' })
  year?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: '학기' })
  semester?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: '학점' })
  credit?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '자격증' })
  certificate?: string[];

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '수상 경력' })
  award?: string[];

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '링크' })
  link?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '기타' })
  additional?: string;
}
