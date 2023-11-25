import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DateEntity } from './dateEntity.entity';
import { User } from './user.entity';
import { Publication } from './publication.entity';

@Entity({ name: 'study' })
export class Study extends DateEntity {
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
  is_notice: boolean;

  @Column({
    type: 'text',
    nullable: true,
    comment: '논문 링크',
  })
  link: string;

  @ManyToOne(() => User, (user) => user.studies, {
    cascade: ['insert', 'recover', 'update'],
  })
  user: User;

  @ManyToOne(() => Publication, (publication) => publication.studies, {
    cascade: ['insert', 'recover', 'update'],
  })
  publication: Publication;
}
