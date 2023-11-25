import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DateEntity } from './dateEntity.entity';
import { User } from './user.entity';

@Entity({ name: 'portfolio' })
export class Portfolio extends DateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    comment: '학과',
    nullable: true,
  })
  department: string;

  @Column({
    type: 'int',
    comment: '학년',
    nullable: true,
  })
  year: number;

  @Column({
    type: 'int',
    comment: '학기',
    nullable: true,
  })
  semester: number;

  @Column({
    type: 'int',
    comment: '학점',
    nullable: true,
  })
  credit: number;

  @Column({
    type: 'text',
    comment: '자격증',
    nullable: true,
  })
  certificate: string;

  @Column({
    type: 'text',
    comment: '수상 경력',
    nullable: true,
  })
  award: string;

  @Column({
    type: 'text',
    nullable: true,
    comment: '링크',
  })
  link: string;

  @Column({
    type: 'text',
    comment: '기타',
    nullable: true,
  })
  additional: string;

  @Column()
  userId: number;

  @OneToOne(() => User, (user) => user.portfolio, {
    cascade: ['insert', 'recover', 'update'],
  })
  user: User;
}
