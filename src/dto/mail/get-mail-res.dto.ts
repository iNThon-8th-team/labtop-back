import { ApiProperty } from '@nestjs/swagger';
import { Lab, Message, User } from 'src/domain/entity';
import { GetUserResDto } from '../user';
import { category } from 'src/common/enum';

export class GetMailResDto {
  constructor(
    receiver: GetUserResDto,
    sender: GetUserResDto,
    message: Message,
  ) {
    (this.receiver = receiver), (this.id = message.id);
    this.sender = sender;
    this.content = message.content;
    this.createdAt = message.createdAt;
  }

  @ApiProperty({ description: '메시지 id' })
  id!: number;

  @ApiProperty({ description: '시각' })
  createdAt!: Date;

  @ApiProperty({ description: '받는 유저' })
  receiver!: GetUserResDto;

  @ApiProperty({ description: '보낸 유저' })
  sender!: GetUserResDto;

  @ApiProperty({ description: '내용' })
  content!: string;
}
