import { CustomRepository } from 'src/common/decorator/custom-repository.decorator';
import { Repository } from 'typeorm';
import { Message } from '../entity';
import { GetMailReqDto } from 'src/dto';
@CustomRepository(Message)
export class MessageRepository extends Repository<Message> {
  async findBySearchOption(req: number): Promise<Message[]> {
    return this.find({
      where: [
        {
          senderId: req ? req : undefined,
        },
        {
          receiverId: req ? req : undefined,
        },
      ],
      relations: { sender: true, receiver: true },
    });
  }
}
