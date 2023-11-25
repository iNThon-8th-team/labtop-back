import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DateEntity } from './dateEntity.entity';
import { User } from './user.entity';

@Entity({ name: 'message' })
export class Message extends DateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    comment: '내용',
    nullable: true,
  })
  content: string;

  @ManyToOne(() => User, (user) => user.sendingMessages, {
    cascade: ['insert', 'recover', 'update'],
  })
  sender: User;

  @ManyToOne(() => User, (user) => user.receivingMessages, {
    cascade: ['insert', 'recover', 'update'],
  })
  receiver: User;
}
