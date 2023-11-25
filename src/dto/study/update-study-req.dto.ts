import { IsDefined, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateStudyReqDto } from './create-study-req.dto';

export class UpdateStudyReqDto extends CreateStudyReqDto {
  @IsDefined()
  @IsNumber()
  @ApiProperty({ description: '포트폴리오 id' })
  id: number;
}
