import { CustomRepository } from 'src/common/decorator/custom-repository.decorator';
import { Repository } from 'typeorm';
import { User } from '../entity';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async findOneByEmailWithPassword(email: string): Promise<User> {
    return this.findOne({
      where: { email },
      select: {
        id: true,
        email: true,
        username: true,
        password: true,
        isProfessor: true,
        isResearcher: true,
      },
    });
  }

  async findOneById(id: number): Promise<User> {
    return this.findOneByOrFail({ id });
  }

  async findOneByIdWithLabs(id: number): Promise<User> {
    return this.findOneOrFail({ where: { id }, relations: { labs: true } });
  }

  async findByLabId(labId: number): Promise<User[]> {
    return this.findBy({ labId });
  }
}
