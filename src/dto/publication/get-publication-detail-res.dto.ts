import { ApiProperty } from '@nestjs/swagger';
import { Publication } from 'src/domain/entity';
import { GetUserResDto } from '../user';
import { GetPublicationResDto } from './get-publication-res.dto';
import { GetStudyListResDto } from '../study';

export class GetPublicationDetailResDto {
  constructor(publication: Publication) {
    this.publication = new GetPublicationResDto(publication);
    this.author = new GetUserResDto(publication.author);
    this.studies = publication.studies.map((study) => {
      return new GetStudyListResDto(study);
    });
  }

  @ApiProperty({ description: '논문' })
  publication: GetPublicationResDto;

  @ApiProperty({ description: '저자' })
  author!: GetUserResDto;

  @ApiProperty({ description: '스터디 목록' })
  studies!: GetStudyListResDto[];
}
