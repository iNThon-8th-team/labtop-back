import { CustomRepository } from 'src/common/decorator/custom-repository.decorator';
import { Repository } from 'typeorm';
import { Study } from '../entity';
@CustomRepository(Study)
export class StudyRepository extends Repository<Study> {}
