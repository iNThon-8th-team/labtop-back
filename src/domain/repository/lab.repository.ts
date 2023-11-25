import { CustomRepository } from 'src/common/decorator/custom-repository.decorator';
import { Like, Repository } from 'typeorm';
import { Lab } from '../entity';
import { GetLabListReqDto } from 'src/dto';
@CustomRepository(Lab)
export class LabRepository extends Repository<Lab> {
  async findBySearchOption(query: GetLabListReqDto) {
    const { search, category } = query;
    return this.find({
      where: [
        {
          name: search ? Like(`%${search}%`) : undefined,
          category: category ? category : undefined,
        },
        {
          professor: { username: search ? Like(`%${search}%`) : undefined },
          category: category ? category : undefined,
        },
        {
          introduction: search ? Like(`%${search}%`) : undefined,
          category: category ? category : undefined,
        },
      ],
      relations: { professor: true },
    });
  }
}
