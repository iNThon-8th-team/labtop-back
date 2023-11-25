import { CustomRepository } from 'src/common/decorator/custom-repository.decorator';
import { Repository } from 'typeorm';
import { Lab, Researcher } from '../entity';
@CustomRepository(Researcher)
export class ResearcherRepository extends Repository<Researcher> {
  async findByUserId(userId: number): Promise<Researcher> {
    return this.findOneOrFail({
      where: { userId: userId },
    });
  }

  async findByLabId(labId: number): Promise<Researcher> {
    return this.findOneOrFail({
      where: { labId: labId },
    });
  }

  async findOneById(id: number): Promise<Researcher> {
    return this.findOneOrFail({
      where: { id },
    });
  }
}
