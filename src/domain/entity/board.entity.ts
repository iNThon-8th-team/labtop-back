import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DateEntity } from './dateEntity.entity';
import { Researcher } from './researcher.entity';
import { Lab } from './lab.entity';

@Entity({ name: 'board' })
export class Board extends DateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    comment: '제목',
  })
  title: string;

  @Column({
    type: 'text',
    comment: '내용',
    nullable: true,
  })
  content: string;

  @Column({
    type: 'boolean',
    default: false,
    comment: '공지 여부',
  })
  isNotice: boolean;

  @Column({
    type: 'text',
    nullable: true,
    comment: '논문 링크',
  })
  link: string;

  @Column()
  researcherId: number;

  @ManyToOne(() => Researcher, (researcher) => researcher.boards, {
    cascade: ['insert', 'recover', 'update'],
  })
  researcher: Researcher;

  @Column()
  labId: number;

  @ManyToOne(() => Lab, (lab) => lab.boards, {
    cascade: ['insert', 'recover', 'update'],
  })
  lab: Lab;
}
