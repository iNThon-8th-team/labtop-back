import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { DateEntity } from './dateEntity.entity';
import { Researcher } from './researcher.entity';
import { Publication } from './publication.entity';

@Entity({ name: 'author' })
@Unique(['researcher', 'publication'])
export class Author extends DateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  researcherId: number;

  @ManyToOne(() => Researcher, (researcher) => researcher.authors, {
    cascade: ['insert', 'recover', 'update'],
  })
  researcher: Researcher;

  @Column()
  publicationId: number;

  @ManyToOne(() => Publication, (publication) => publication.authors, {
    cascade: ['insert', 'recover', 'update'],
  })
  publication: Publication;
}
