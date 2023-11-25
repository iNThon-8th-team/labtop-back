import { ApiProperty } from '@nestjs/swagger';
import { Lab, User } from 'src/domain/entity';
import { GetUserResDto } from '../user';

export class GetLabListResDto {
  constructor(lab: Lab, professor: User) {
    this.name = lab.name;
    this.introduction = lab.introduction;
    this.isRecruiting = lab.isRecruiting;
    this.professor = new GetUserResDto(professor);
  }

  @ApiProperty({ description: '이메일' })
  name!: string;

  @ApiProperty({ description: '연구실 소개' })
  introduction!: string;

  @ApiProperty({ description: '모집 중 여부' })
  isRecruiting!: boolean;

  @ApiProperty({ description: '교수' })
  professor!: GetUserResDto;
}
