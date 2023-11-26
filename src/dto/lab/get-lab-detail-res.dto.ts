import { ApiProperty } from '@nestjs/swagger';
import { Lab, User } from 'src/domain/entity';
import { GetUserResDto } from '../user';
import { category } from 'src/common/enum';

export class GetLabDetailResDto {
  constructor(
    lab: Lab,
    professor: User,
    researchers: User[],
    isSubscribed: boolean,
  ) {
    this.id = lab.id;
    this.name = lab.name;
    this.introduction = lab.introduction;
    this.isRecruiting = lab.isRecruiting;
    this.category = lab.category;
    this.professor = new GetUserResDto(professor);
    this.researchers = researchers.map(
      (researcher) => new GetUserResDto(researcher),
    );
    this.isSubscribed = isSubscribed;
    this.image = lab.image;
  }

  @ApiProperty({ description: '연구실 id' })
  id!: number;

  @ApiProperty({ description: '이메일' })
  name!: string;

  @ApiProperty({ description: '연구실 소개' })
  introduction!: string;

  @ApiProperty({ description: '연구실 카테고리' })
  category!: category;

  @ApiProperty({ description: '모집 중 여부' })
  isRecruiting!: boolean;

  @ApiProperty({ description: '교수' })
  professor!: GetUserResDto;

  @ApiProperty({ description: '소속 연구원' })
  researchers!: GetUserResDto[];

  @ApiProperty({ description: '구독 여부' })
  isSubscribed!: boolean;

  @ApiProperty({ description: '대표 이미지' })
  image?: string;
}
