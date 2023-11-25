import { CustomRepository } from 'src/common/decorator/custom-repository.decorator';
import { Like, Repository } from 'typeorm';
import { Board, Subscribe } from '../entity';
import { GetBoardReqDto } from 'src/dto';
@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {
  async findAll(): Promise<Board[]> {
    return this.find();
  }

  async findBySearchOption(query: GetBoardReqDto): Promise<Board[]> {
    const { labName, title, category } = query;
    if (!labName && !title && !category) return this.find();

    return this.find({
      where: [
        {
          lab: {
            name: labName ? labName : undefined,
            category: category ? category : undefined,
          },
          title: title ? Like(`%${title}%`) : undefined,
        },
      ],
      relations: { lab: true },
    });
  }
}
