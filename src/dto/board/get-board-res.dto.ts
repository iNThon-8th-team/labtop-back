import { ApiProperty } from '@nestjs/swagger';
import { Lab, Board, User } from 'src/domain/entity';
import { GetUserResDto } from '../user';
import { GetLabListResDto } from '../lab';

export class GetBoardResDto {
  constructor(board: Board, professor: User, lab: Lab) {
    this.title = board.title;
    this.content = board.content;
    this.isNotice = board.isNotice;
    this.lab = new GetLabListResDto(lab, professor);
  }

  @ApiProperty({ description: '제목' })
  title!: string;

  @ApiProperty({ description: '내용' })
  content!: string;

  @ApiProperty({ description: '공지' })
  isNotice!: boolean;

  @ApiProperty({ description: '연구실' })
  lab!: GetLabListResDto;
}
