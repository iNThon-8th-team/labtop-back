import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';
export class CreateMailReqDto {
  @IsDefined()
  @IsString()
  @ApiProperty({ description: '내용' })
  content!: string;

  @IsDefined()
  @IsString()
  @ApiProperty({ description: '받는 사람' })
  to!: string;
}
