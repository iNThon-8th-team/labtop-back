import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/domain/entity';

export class LoginResDto {
  constructor(accessToken: string, user: User) {
    this.id = user.id;
    this.email = user.email;
    this.username = user.username;
    this.isProfessor = user.isProfessor;
    this.isResearcher = user.isResearcher;
    this.accessToken = accessToken;
  }

  @ApiProperty({ description: '사용자 id' })
  id!: number;

  @ApiProperty({ description: '이메일' })
  email!: string;

  @ApiProperty({ description: '사용자 이름' })
  username!: string;

  @ApiProperty({ description: '교수 여부 ' })
  isProfessor!: boolean;

  @ApiProperty({ description: '연구자 여부' })
  isResearcher!: boolean;

  @ApiProperty({ description: 'access token' })
  accessToken!: string;
}
