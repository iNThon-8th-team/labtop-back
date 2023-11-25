import { IsDefined, IsNumber } from 'class-validator';
import { CreateLabReqDto } from './create-lab-req.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLabReqDto extends CreateLabReqDto {
  @IsDefined()
  @IsNumber()
  @ApiProperty({ description: '연구실 id' })
  id!: number;
}
