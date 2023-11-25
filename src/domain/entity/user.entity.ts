import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DateEntity } from './dateEntity.entity';

@Entity({ name: 'user' })
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
}
