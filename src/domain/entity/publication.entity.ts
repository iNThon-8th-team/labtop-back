import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateEntity } from './dateEntity.entity';
import { Study } from './study.entity';
import { User } from './user.entity';

@Entity({ name: 'publication' })
export class Publication extends DateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    comment: '제목',
  })
  title: string;

  @Column({
    type: 'text',
    comment: '내용 요약',
    nullable: true,
  })
  content: string;

  @Column({
    type: 'text',
    nullable: true,
    comment: '논문 링크',
  })
  link: string;

  @Column()
  authorId: number;

  @ManyToOne(() => User, (author) => author.publications, {
    cascade: ['insert', 'recover', 'update'],
  })
  author: User;

  @OneToMany(() => Study, (study) => study.publication, {
    cascade: ['insert', 'recover', 'remove', 'soft-remove', 'update'],
  })
  studies: Study[];
}
