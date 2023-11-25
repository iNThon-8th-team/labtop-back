import { CustomRepository } from 'src/common/decorator/custom-repository.decorator';
import { Repository } from 'typeorm';
import { Researcher } from '../entity';
@CustomRepository(Researcher)
export class ResearcherRepository extends Repository<Researcher> {}
