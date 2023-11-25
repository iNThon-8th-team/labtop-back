import { CustomRepository } from 'src/common/decorator/custom-repository.decorator';
import { Repository } from 'typeorm';
import { User } from '../entity';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async findOneByEmaileWithPassword(email: string) {
    return this.findOne({
      where: { email },
      select: { id: true, email: true, username: true, password: true },
    });
  }

  async findOneById(id: number) {
    return this.findOneByOrFail({ id });
  }
}
