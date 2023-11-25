import { CustomRepository } from 'src/common/decorator/custom-repository.decorator';
import { Repository } from 'typeorm';
import { Board } from '../entity';
@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {
  async findAll(): Promise<Board[]> {
    return this.find();
  }
}
