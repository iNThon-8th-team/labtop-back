import { Injectable } from '@nestjs/common';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { User } from 'src/domain/entity';
import { MessageRepository, UserRepository } from 'src/domain/repository';
import {
  CreateMailReqDto,
  GetMailReqDto,
  GetMailResDto,
  GetUserResDto,
  OkResDto,
} from 'src/dto';

@Injectable()
export class MailService {
  constructor(
    private userRepository: UserRepository,
    private messageRepository: MessageRepository,
  ) {}

  async getMailList(query: GetMailReqDto): Promise<GetMailResDto[]> {
    const messages = await this.messageRepository.findBySearchOption(query);
    return Promise.all(
      messages.map(async (message) => {
        return new GetMailResDto(
          new GetUserResDto(message.receiver),
          new GetUserResDto(message.sender),
          message,
        );
      }),
    );
  }

  async writeMessage(user: User, mail: CreateMailReqDto): Promise<OkResDto> {
    const newMail = this.messageRepository.create();
    const receiver = await this.userRepository.findOneByEmailWithPassword(
      mail.to,
    );
    if (!receiver) {
      return new OkResDto();
    }
    newMail.content = mail.content;
    newMail.senderId = user.id;
    newMail.receiverId = receiver.id;

    await this.messageRepository.save(newMail);
    return new OkResDto();
  }
}
