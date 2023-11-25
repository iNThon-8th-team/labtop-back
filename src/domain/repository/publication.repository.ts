import { CustomRepository } from 'src/common/decorator/custom-repository.decorator';
import { Repository } from 'typeorm';
import { Publication } from '../entity';
@CustomRepository(Publication)
export class PublicationRepository extends Repository<Publication> {}
