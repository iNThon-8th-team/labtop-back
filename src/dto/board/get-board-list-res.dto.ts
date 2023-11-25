import { ApiProperty } from '@nestjs/swagger';
import { Board } from 'src/domain/entity';

export class GetBoardListResDto {
  constructor(board: Board) {
    this.id = board.id;
    this.title = board.title;
    this.content = board.content;
    this.isNotice = board.isNotice;
  }

  @ApiProperty({ description: '보드 id' })
  id!: number;

  @ApiProperty({ description: '제목' })
  title!: string;

  @ApiProperty({ description: '내용' })
  content!: string;

  @ApiProperty({ description: '공지 여부' })
  isNotice!: boolean;
}
