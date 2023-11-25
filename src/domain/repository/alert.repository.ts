import { CustomRepository } from 'src/common/decorator/custom-repository.decorator';
import { Repository } from 'typeorm';
import { Alert } from '../entity';
@CustomRepository(Alert)
export class AlertRepository extends Repository<Alert> {}
