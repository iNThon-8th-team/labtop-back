import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/domain/entity';

export class CreateUserResDto {
  constructor(user: User) {
    this.username = user.username;
    this.password = user.password;
  }

  @ApiProperty({ description: '사용자 이름' })
  username!: string;

  @ApiProperty({ description: '비밀번호' })
  password!: string;
}
