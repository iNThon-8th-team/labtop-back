import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DateEntity } from './dateEntity.entity';
import { User } from './user.entity';

@Entity({ name: 'alert' })
export class Alert extends DateEntity {
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

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.alerts, {
    cascade: ['insert', 'recover', 'update'],
  })
  user: User;
}
