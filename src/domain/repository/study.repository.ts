import { CustomRepository } from 'src/common/decorator/custom-repository.decorator';
import { Repository } from 'typeorm';
import { Study } from '../entity';
@CustomRepository(Study)
export class StudyRepository extends Repository<Study> {
  async findOneById(studyId: number): Promise<Study> {
    return this.findOneByOrFail({ id: studyId });
  }

  async findOneByIdWithUser(studyId: number): Promise<Study> {
    return this.findOneOrFail({
      where: { id: studyId },
      relations: { user: true },
    });
  }
}
