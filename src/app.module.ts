import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validation } from './common/util/validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  User,
  Lab,
  Alert,
  Board,
  Message,
  Publication,
  Study,
  Subscribe,
} from './domain/entity';
import { AuthModule } from './api/auth/auth.module';
import { LabModule } from './api/lab/lab.module';
import { BoardModule } from './api/board/board.module';
import { StudyModule } from './api/study/study.module';
import { UserModule } from './api/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.production.env'
          : process.env.NODE_ENV === 'development'
          ? '.development.env'
          : '.env',
      isGlobal: true,
      validationSchema: validation,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        User,
        Lab,
        Alert,
        Board,
        Message,
        Publication,
        Study,
        Subscribe,
      ],
      synchronize: true,
    }),
    AuthModule,
    LabModule,
    BoardModule,
    StudyModule,
    UserModule,
  ],
})
export class AppModule {}
