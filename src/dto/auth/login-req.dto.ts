import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsOptional, IsString } from 'class-validator';
export class LoginReqDto {
  @IsDefined()
  @IsString()
  @ApiProperty({ description: '사용자 이름' })
  email: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '비밀번호' })
  password: string;
}
