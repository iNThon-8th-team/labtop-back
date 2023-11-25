import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/common/typorm-ex.module';
import { LabService } from './lab.service';
import { LabController } from './lab.controller';
import {
  LabRepository,
  SubscribeRepository,
  UserRepository,
} from 'src/domain/repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([
      LabRepository,
      UserRepository,
      SubscribeRepository,
    ]),
    AuthModule,
  ],
  controllers: [LabController],
  providers: [LabService],
  exports: [LabService],
})
export class LabModule {}
