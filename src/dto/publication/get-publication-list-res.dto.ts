import { ApiProperty } from '@nestjs/swagger';
import { Publication, User } from 'src/domain/entity';
import { GetUserResDto } from '../user';
import { GetPublicationResDto } from './get-publication-res.dto';

export class GetPublicationListResDto {
  constructor(publications: Publication[], author: User) {
    this.publications = publications.map((publication) => {
      const n = new GetPublicationResDto(publication);
      console.log(n);
      return n;
    });
    this.author = new GetUserResDto(author);
  }

  @ApiProperty({ description: '논문' })
  publications: GetPublicationResDto[];

  @ApiProperty({ description: '저자' })
  author!: GetUserResDto;
}
