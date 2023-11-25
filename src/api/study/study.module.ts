import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/common/typorm-ex.module';
import { StudyRepository } from 'src/domain/repository';
import { AuthModule } from '../auth/auth.module';
import { StudyService } from './study.service';
import { StudyController } from './study.controller';
@Module({
  imports: [TypeOrmExModule.forCustomRepository([StudyRepository]), AuthModule],
  controllers: [StudyController],
  providers: [StudyService],
  exports: [StudyService],
})
export class StudyModule {}
