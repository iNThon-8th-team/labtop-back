import { CustomRepository } from 'src/common/decorator/custom-repository.decorator';
import { Repository } from 'typeorm';
import { Message } from '../entity';
import { GetMailReqDto } from 'src/dto';
@CustomRepository(Message)
export class MessageRepository extends Repository<Message> {
  async findBySearchOption(req: GetMailReqDto): Promise<Message[]> {
    const { sender, receiver } = req;
    return this.find({
      where: [
        {
          senderId: sender ? sender : undefined,
          receiverId: receiver ? receiver : undefined,
        },
      ],
      relations: { sender: true, receiver: true },
    });
  }
}
