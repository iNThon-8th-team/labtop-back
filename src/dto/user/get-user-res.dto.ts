import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/domain/entity';

export class GetUserResDto {
  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.username = user.username;
    this.isProfessor = user.isProfessor;
    this.isResearcher = user.isResearcher;
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
}
