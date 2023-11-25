import { CustomRepository } from 'src/common/decorator/custom-repository.decorator';
import { Repository } from 'typeorm';
import { Lab } from '../entity';
@CustomRepository(Lab)
export class LabRepository extends Repository<Lab> {}
