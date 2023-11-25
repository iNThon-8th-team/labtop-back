import { ApiProperty } from '@nestjs/swagger';
import { Lab, Board, User } from 'src/domain/entity';
import { GetLabListResDto } from '../lab';
import { GetUserResDto } from '../user';

export class GetBoardResDto {
  constructor(board: Board, user: User, professor: User, lab: Lab) {
    this.id = board.id;
    this.title = board.title;
    this.createdAt = board.createdAt;
    this.content = board.content;
    this.isNotice = board.isNotice;
    this.author = new GetUserResDto(user);
    this.lab = new GetLabListResDto(lab, professor);
  }

  @ApiProperty({ description: '보드 id' })
  id!: number;

  @ApiProperty({ description: '작성 일자' })
  createdAt!: Date;

  @ApiProperty({ description: '제목' })
  title!: string;

  @ApiProperty({ description: '내용' })
  content!: string;

  @ApiProperty({ description: '공지' })
  isNotice!: boolean;

  @ApiProperty({ description: '작성자' })
  author!: GetUserResDto;

  @ApiProperty({ description: '연구실' })
  lab!: GetLabListResDto;
}
