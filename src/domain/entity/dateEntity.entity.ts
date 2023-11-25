import { BaseEntity, CreateDateColumn, DeleteDateColumn } from 'typeorm';

export abstract class DateEntity extends BaseEntity {
  @CreateDateColumn({
    type: 'timestamp',
    comment: '생성 날짜',
  })
  createdAt: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    comment: '삭제 날짜',
  })
  deletedAt: Date;
}
