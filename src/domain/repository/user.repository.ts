import { CustomRepository } from 'src/common/decorator/custom-repository.decorator';
import { Repository } from 'typeorm';
import { User } from '../entity';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async findOneByUsernameWithPassword(username: string) {
    return this.findOne({
      where: { username },
      select: { id: true, username: true, password: true },
    });
  }
}
