import { IsDefined, IsNumber } from 'class-validator';
import { CreateBoardReqDto } from './create-board-req.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBoardReqDto extends CreateBoardReqDto {
  @IsDefined()
  @IsNumber()
  @ApiProperty({ description: '게시물 id' })
  id!: number;
}
