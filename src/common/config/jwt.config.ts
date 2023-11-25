import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const jwtOptions: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return {
      secret: configService.get<string>('JWT_SECRET_KEY'),
      signOptions: {
        expiresIn: `${configService.get<number>('JWT_ACCESS_TOKEN_EXPIRES')}s`,
      },
    };
  },
};
