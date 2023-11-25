import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';
export class LoginReqDto {
  @IsDefined()
  @IsString()
  @ApiProperty({ description: '사용자 이름' })
  email: string;

  @IsDefined()
  @IsString()
  @ApiProperty({ description: '비밀번호' })
  password: string;
}
