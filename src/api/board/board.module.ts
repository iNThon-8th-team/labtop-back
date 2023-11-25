import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { TypeOrmExModule } from 'src/common/typorm-ex.module';
import {
  BoardRepository,
  LabRepository,
  ResearcherRepository,
  SubscribeRepository,
  UserRepository,
} from 'src/domain/repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([
      LabRepository,
      UserRepository,
      BoardRepository,
      ResearcherRepository,
      SubscribeRepository,
    ]),
    AuthModule,
  ],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
