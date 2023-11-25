import { CustomRepository } from 'src/common/decorator/custom-repository.decorator';
import { Repository } from 'typeorm';
import { Subscribe } from '../entity';
@CustomRepository(Subscribe)
export class SubscribeRepository extends Repository<Subscribe> {}