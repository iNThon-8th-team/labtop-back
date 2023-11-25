import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
export class GetMailReqDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: '보낸 유저 id' })
  sender?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: '받는 유저 id' })
  receiver?: number;
}
