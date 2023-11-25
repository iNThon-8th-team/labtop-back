import { CustomRepository } from 'src/common/decorator/custom-repository.decorator';
import { Repository } from 'typeorm';
import { Message } from '../entity';
@CustomRepository(Message)
export class MessageRepository extends Repository<Message> {}
