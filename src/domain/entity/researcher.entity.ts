import {
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { DateEntity } from './dateEntity.entity';
import { User } from './user.entity';
import { Lab } from './lab.entity';
import { Author } from './author.entity';
import { Board } from './board.entity';

@Entity({ name: 'researcher' })
@Unique(['user', 'lab'])
export class Researcher extends DateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.researchers, {
    cascade: ['insert', 'recover', 'update'],
  })
  user: User;

  @ManyToOne(() => Lab, (lab) => lab.researchers, {
    cascade: ['insert', 'recover', 'update'],
  })
  lab: Lab;

  @OneToMany(() => Author, (author) => author.publication, {
    cascade: ['insert', 'recover', 'remove', 'soft-remove', 'update'],
  })
  authors: Author[];

  @OneToMany(() => Board, (board) => board.researcher, {
    cascade: ['insert', 'recover', 'remove', 'soft-remove', 'update'],
  })
  boards: Board[];
}
