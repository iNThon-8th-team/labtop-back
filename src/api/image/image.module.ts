import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { MulterModule } from '@nestjs/platform-express';
import {
  LabRepository,
  ResearcherRepository,
  UserRepository,
} from 'src/domain/repository';
import { TypeOrmExModule } from 'src/common/typorm-ex.module';

@Module({
  imports: [
    MulterModule.register({
      dest: './files',
    }),
    TypeOrmExModule.forCustomRepository([
      LabRepository,
      UserRepository,
      ResearcherRepository,
    ]),
  ],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
