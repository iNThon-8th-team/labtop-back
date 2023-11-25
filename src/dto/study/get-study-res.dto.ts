import { ApiProperty } from '@nestjs/swagger';
import { Study } from 'src/domain/entity';
import { GetUserResDto } from '../user';

export class GetStudyResDto {
  constructor(study: Study) {
    this.id = study.id;
    this.title = study.title;
    this.content = study.content;
    this.link = study.link;
    this.createdAt = study.createdAt;
    this.user = new GetUserResDto(study.user);
  }

  @ApiProperty({ description: '포트폴리오 id' })
  id!: number;

  @ApiProperty({ description: '제목' })
  title!: string;

  @ApiProperty({ description: '내용' })
  content!: string;

  @ApiProperty({ description: '논문 링크' })
  link!: string;

  @ApiProperty({ description: '작성 날짜' })
  createdAt!: Date;

  @ApiProperty({ description: '작성자' })
  user!: GetUserResDto;
}