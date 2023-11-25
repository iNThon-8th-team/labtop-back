import { CustomRepository } from 'src/common/decorator/custom-repository.decorator';
import { Repository } from 'typeorm';
import { Publication } from '../entity';
@CustomRepository(Publication)
export class PublicationRepository extends Repository<Publication> {
  async findByAuthorId(authorId: number): Promise<Publication[]> {
    return this.find({ where: { authorId } });
  }

  async findOneByIdWithStudiesAndAuthor(
    publicationId: number,
  ): Promise<Publication> {
    return this.findOne({
      where: { id: publicationId },
      relations: { studies: true, author: true },
    });
  }
}
