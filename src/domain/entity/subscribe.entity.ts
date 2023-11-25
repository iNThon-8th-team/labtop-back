import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { DateEntity } from './dateEntity.entity';
import { User } from './user.entity';
import { Lab } from './lab.entity';

@Entity({ name: 'subscribe' })
@Unique(['user', 'lab'])
export class Subscribe extends DateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.subscribes, {
    cascade: ['insert', 'recover', 'update'],
  })
  user: User;

  @Column()
  labId: number;

  @ManyToOne(() => Lab, (lab) => lab.subscribes, {
    cascade: ['insert', 'recover', 'update'],
  })
  lab: Lab;
}
