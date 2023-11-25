import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { TypeOrmExModule } from 'src/common/typorm-ex.module';
import {
  BoardRepository,
  LabRepository,
  ResearcherRepository,
  UserRepository,
} from 'src/domain/repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([
      LabRepository,
      UserRepository,
      BoardRepository,
      ResearcherRepository,
    ]),
  ],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
