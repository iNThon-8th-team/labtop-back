import { CustomRepository } from 'src/common/decorator/custom-repository.decorator';
import { Repository } from 'typeorm';
import { Author } from '../entity';
@CustomRepository(Author)
export class AuthorRepository extends Repository<Author> {}
