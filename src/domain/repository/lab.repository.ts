import { CustomRepository } from 'src/common/decorator/custom-repository.decorator';
import { Like, Repository } from 'typeorm';
import { Lab } from '../entity';
import { GetLabListReqDto } from 'src/dto';
@CustomRepository(Lab)
export class LabRepository extends Repository<Lab> {
  async findBySearchOption(query: GetLabListReqDto): Promise<Lab[]> {
    const { search, category } = query;
    if (!search && !category) return this.find();
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

  async findOneById(labId: number): Promise<Lab> {
    return this.findOneByOrFail({ id: labId });
  }

  async findOneByIdWithResearchers(labId: number): Promise<Lab> {
    return this.findOneOrFail({
      where: { id: labId },
      relations: { researchers: true },
    });
  }

  async findOneByIdWithResearchsersAndProfessor(labId: number): Promise<Lab> {
    return this.findOneOrFail({
      where: { id: labId },
      relations: { researchers: true, professor: true },
    });
  }

  async findOneByIdWithProfessor(labId: number): Promise<Lab> {
    return this.findOneOrFail({
      where: { id: labId },
      relations: { professor: true },
    });
  }
}
