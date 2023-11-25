import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateEntity } from './dateEntity.entity';
import { User } from './user.entity';
import { category } from 'src/common/enum';
import { Subscribe } from './subscribe.entity';
import { Researcher } from './researcher.entity';
import { Board } from './board.entity';

@Entity({ name: 'lab' })
export class Lab extends DateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    comment: '연구실 이름',
  })
  name: string;

  @Column({
    type: 'text',
    comment: '소개글',
    nullable: true,
  })
  introduction: string;

  @Column({
    type: 'boolean',
    default: false,
    comment: '모집 중 여부',
  })
  isRecruiting: boolean;

  @Column({
    type: 'enum',
    enum: category,
    nullable: true,
    comment: '카테고리',
  })
  category: category;

  @Column({
    type: 'text',
    nullable: true,
    comment: '대표 이미지',
  })
  image: string;

  @Column()
  professorId: number;

  @ManyToOne(() => User, (user) => user.labs, {
    cascade: ['insert', 'recover', 'update'],
  })
  professor: User;

  @OneToMany(() => Subscribe, (subscribe) => subscribe.lab, {
    cascade: ['insert', 'recover', 'remove', 'soft-remove', 'update'],
  })
  subscribes: Subscribe[];

  @OneToMany(() => Researcher, (researcher) => researcher.lab, {
    cascade: ['insert', 'recover', 'remove', 'soft-remove', 'update'],
  })
  researchers: Researcher[];

  @OneToMany(() => Board, (board) => board.lab, {
    cascade: ['insert', 'recover', 'remove', 'soft-remove', 'update'],
  })
  boards: Board[];
}
