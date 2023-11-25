import { ApiProperty } from '@nestjs/swagger';

export class LoginResDto {
  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  @ApiProperty({ description: 'access token' })
  accessToken!: string;
}
