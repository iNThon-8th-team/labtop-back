import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/common/typorm-ex.module';
import { PublicationRepository } from 'src/domain/repository';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
@Module({
  imports: [TypeOrmExModule.forCustomRepository([PublicationRepository])],
  controllers: [PublicationController],
  providers: [PublicationService],
  exports: [PublicationService],
})
export class PublicationModule {}
