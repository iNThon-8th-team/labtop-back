import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/common/typorm-ex.module';
import { LabService } from './lab.service';
import { LabController } from './lab.controller';
import { LabRepository, UserRepository } from 'src/domain/repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([LabRepository, UserRepository]),
  ],
  controllers: [LabController],
  providers: [LabService],
  exports: [LabService],
})
export class LabModule {}
