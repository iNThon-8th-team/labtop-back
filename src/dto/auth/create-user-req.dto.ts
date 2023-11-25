import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';
export class CreateUserReqDto {
  @IsDefined()
  @IsString()
  @ApiProperty({ description: '이메일' })
  email: string;

  @IsDefined()
  @IsString()
  @ApiProperty({ description: '사용자 이름' })
  username: string;

  @IsDefined()
  @IsString()
  @ApiProperty({ description: '비밀번호' })
  password: string;

  @IsDefined()
  @IsString()
  @ApiProperty({ description: '교수 여부' })
  isProfessor: boolean;
}
