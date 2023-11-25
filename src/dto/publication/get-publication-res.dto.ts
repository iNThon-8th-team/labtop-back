import { ApiProperty } from '@nestjs/swagger';
import { Publication } from 'src/domain/entity';

export class GetPublicationResDto {
  constructor(publication: Publication) {
    this.id = publication.id;
    this.title = publication.title;
    this.content = publication.content;
    this.link = publication.link;
  }

  @ApiProperty({ description: '논문 id' })
  id!: number;

  @ApiProperty({ description: '제목' })
  title!: string;

  @ApiProperty({ description: '논문 요약' })
  content!: string;

  @ApiProperty({ description: '링크' })
  link!: string;
}
