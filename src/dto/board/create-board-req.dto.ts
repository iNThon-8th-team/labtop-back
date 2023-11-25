import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDefined, IsNumber, IsString } from 'class-validator';
export class CreateBoardReqDto {
  @IsDefined()
  @IsString()
  @ApiProperty({ description: '제목' })
  title: string;

  @IsDefined()
  @IsString()
  @ApiProperty({ description: '내용' })
  content: string;

  @IsDefined()
  @IsBoolean()
  @ApiProperty({ description: '공지' })
  isNotice: boolean;

  @IsDefined()
  @IsNumber()
  @ApiProperty({ description: '연구실' })
  labId: number;

  @IsDefined()
  @IsNumber()
  @ApiProperty({ description: '연구원' })
  reseacherId: number;
}
