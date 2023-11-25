import { ApiProperty } from '@nestjs/swagger';
import { Lab, User } from 'src/domain/entity';
import { GetUserResDto } from '../user';
import { category } from 'src/common/enum';

export class GetLabListResDto {
  constructor(lab: Lab, professor: User) {
    this.id = lab.id;
    this.name = lab.name;
    this.introduction = lab.introduction;
    this.isRecruiting = lab.isRecruiting;
    this.category = lab.category;
    this.professor = new GetUserResDto(professor);
  }

  @ApiProperty({ description: '연구실 id' })
  id!: number;

  @ApiProperty({ description: '이메일' })
  name!: string;

  @ApiProperty({ description: '연구실 소개' })
  introduction!: string;

  @ApiProperty({ description: '모집 중 여부' })
  isRecruiting!: boolean;

  @ApiProperty({ description: '모집 중 여부' })
  category!: category;

  @ApiProperty({ description: '교수' })
  professor!: GetUserResDto;
}
