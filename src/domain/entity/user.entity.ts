import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { DateEntity } from './dateEntity.entity';
import { Lab } from './lab.entity';
import { Subscribe } from './subscribe.entity';
import { Message } from './mesage.entity';
import { Alert } from './alert.entity';
import { Study } from './study.entity';
import { Publication } from './publication.entity';
import { Board } from './board.entity';

@Entity({ name: 'user' })
@Unique(['email'])
export class User extends DateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: '50',
    comment: '이메일',
  })
  email: string;

  @Column({
    type: 'varchar',
    length: '50',
    comment: '사용자 이름',
  })
  username: string;

  @Column({
    type: 'varchar',
    length: '200',
    select: false,
    comment: '비밀번호',
  })
  password: string;

  @Column({
    type: 'boolean',
    default: false,
    comment: '교수 여부',
  })
  isProfessor: boolean;

  @Column({
    type: 'boolean',
    default: false,
    comment: '연구진 여부',
  })
  isResearcher: boolean;

  @Column({
    type: 'text',
    comment: '자기 소개',
    nullable: true,
  })
  introduction: string;

  @Column({
    type: 'text',
    nullable: true,
    comment: '프로필 이미지',
  })
  profile: string;

  @Column({ nullable: true })
  labId: number;

  @ManyToOne(() => Lab, (lab) => lab.researchers, {
    cascade: ['insert', 'recover', 'update'],
  })
  lab: Lab;

  @OneToMany(() => Lab, (lab) => lab.professor, {
    cascade: ['insert', 'recover', 'remove', 'soft-remove', 'update'],
  })
  labs: Lab[];

  @OneToMany(() => Subscribe, (subscribe) => subscribe.user, {
    cascade: ['insert', 'recover', 'remove', 'soft-remove', 'update'],
  })
  subscribes: Subscribe[];

  @OneToMany(() => Message, (message) => message.sender, {
    cascade: ['insert', 'recover', 'remove', 'soft-remove', 'update'],
  })
  sendingMessages: Message[];

  @OneToMany(() => Message, (message) => message.receiver, {
    cascade: ['insert', 'recover', 'remove', 'soft-remove', 'update'],
  })
  receivingMessages: Message[];

  @OneToMany(() => Alert, (alert) => alert.user, {
    cascade: ['insert', 'recover', 'remove', 'soft-remove', 'update'],
  })
  alerts: Alert[];

  @OneToMany(() => Study, (study) => study.user, {
    cascade: ['insert', 'recover', 'remove', 'soft-remove', 'update'],
  })
  studies: Study[];

  @OneToMany(() => Board, (study) => study.author, {
    cascade: ['insert', 'recover', 'remove', 'soft-remove', 'update'],
  })
  boards: Board[];

  @OneToMany(() => Publication, (publication) => publication.author, {
    cascade: ['insert', 'recover', 'remove', 'soft-remove', 'update'],
  })
  publications: Publication[];
}
