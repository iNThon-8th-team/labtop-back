import { CustomRepository } from 'src/common/decorator/custom-repository.decorator';
import { Repository } from 'typeorm';
import { Study } from '../entity';
@CustomRepository(Study)
export class StudyRepository extends Repository<Study> {
  async findOneById(studyId: number): Promise<Study> {
    return this.findOneByOrFail({ id: studyId });
  }

  async findByUserIdWithPublication(userId: number): Promise<Study[]> {
    return this.find({ where: { userId }, relations: { publication: true } });
  }

  async findOneByIdWithUserAndPublication(studyId: number): Promise<Study> {
    return this.findOneOrFail({
      where: { id: studyId },
      relations: { user: true, publication: true },
    });
  }
}
