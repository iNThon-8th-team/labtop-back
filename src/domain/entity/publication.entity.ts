import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DateEntity } from './dateEntity.entity';
import { Author } from './author.entity';

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

  @OneToMany(() => Author, (author) => author.publication, {
    cascade: ['insert', 'recover', 'remove', 'soft-remove', 'update'],
  })
  authors: Author[];
}
