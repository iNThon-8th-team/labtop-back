import { CustomRepository } from 'src/common/decorator/custom-repository.decorator';
import { Repository } from 'typeorm';
import { Portfolio } from '../entity';
@CustomRepository(Portfolio)
export class PortfolioRepository extends Repository<Portfolio> {
  async findOneByUserId(userId: number): Promise<Portfolio> {
    return this.findOneBy({ userId });
  }
}
