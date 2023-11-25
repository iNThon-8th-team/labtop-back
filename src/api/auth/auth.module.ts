import { Module } from '@nestjs/common';
import { UserRepository } from 'src/domain/repository/user.repository';
import { TypeOrmExModule } from 'src/common/typorm-ex.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from 'src/common/jwt/passport.jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtOptions } from 'src/common/config/jwt.config';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([UserRepository]),
    JwtModule.registerAsync(jwtOptions),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
