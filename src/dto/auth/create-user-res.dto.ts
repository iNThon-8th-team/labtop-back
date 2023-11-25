import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/domain/entity';

export class CreateUserResDto {
  constructor(user: User) {
    this.email = user.email;
    this.username = user.username;
  }

  @ApiProperty({ description: '이메일' })
  email!: string;

  @ApiProperty({ description: '사용자 이름' })
  username!: string;
}
