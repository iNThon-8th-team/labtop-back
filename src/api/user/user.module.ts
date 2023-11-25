import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/common/typorm-ex.module';
import {
  PortfolioRepository,
  SubscribeRepository,
  UserRepository,
} from 'src/domain/repository';
import { UserController } from './user.controller';
import { UserService } from './user.services';
@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([
      UserRepository,
      SubscribeRepository,
      PortfolioRepository,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
