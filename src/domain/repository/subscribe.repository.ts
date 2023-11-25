import { CustomRepository } from 'src/common/decorator/custom-repository.decorator';
import { Repository } from 'typeorm';
import { Subscribe } from '../entity';
@CustomRepository(Subscribe)
export class SubscribeRepository extends Repository<Subscribe> {
  async findOneByUserIdAndLabId(
    userId: number,
    labId: number,
  ): Promise<Subscribe> {
    return this.findOneBy({ userId, labId });
  }

  async findByUserId(userId: number): Promise<Subscribe[]> {
    return this.find({ where: { userId } });
  }
}
