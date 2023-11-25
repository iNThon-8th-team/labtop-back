import { ApiProperty } from '@nestjs/swagger';
import { Study } from 'src/domain/entity';
import { GetUserResDto } from '../user';
import { GetStudyListResDto } from './get-study-list-res.dto';

export class GetStudyResDto extends GetStudyListResDto {
  super(study: Study) {
    this.id = study.id;
    this.title = study.title;
    this.content = study.content;
    this.link = study.link;
    this.createdAt = study.createdAt;
    this.user = new GetUserResDto(study.user);
  }

  @ApiProperty({ description: '작성자' })
  user!: GetUserResDto;
}
