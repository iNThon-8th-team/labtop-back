import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { MessageRepository, UserRepository } from 'src/domain/repository';
import { TypeOrmExModule } from 'src/common/typorm-ex.module';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([UserRepository, MessageRepository]),
  ],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
