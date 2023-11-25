import { ApiProperty } from '@nestjs/swagger';
import { separateInput } from 'src/common/util/util';
import { Portfolio } from 'src/domain/entity';
export class GetPortfolioResDto {
  constructor(potfolio: Portfolio) {
    this.department = potfolio.department;
    this.year = potfolio.year;
    this.semester = potfolio.semester;
    this.credit = potfolio.credit;
    this.certificate = separateInput(potfolio.certificate);
    this.award = separateInput(potfolio.award);
    this.link = potfolio.link;
    this.additional = potfolio.additional;
  }
  @ApiProperty({ description: '학과' })
  department: string;

  @ApiProperty({ description: '학년' })
  year: number;

  @ApiProperty({ description: '학기' })
  semester: number;

  @ApiProperty({ description: '학점' })
  credit: number;

  @ApiProperty({ description: '자격증' })
  certificate: string[];

  @ApiProperty({ description: '수상 경력' })
  award: string[];

  @ApiProperty({ description: '링크' })
  link: string;

  @ApiProperty({ description: '기타' })
  additional: string;
}
