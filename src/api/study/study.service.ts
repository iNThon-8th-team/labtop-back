import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  CreateStudyReqDto,
  GetStudyResDto,
  OkResDto,
  UpdateStudyReqDto,
  GetStudyListResDto,
} from 'src/dto';
import { StudyRepository } from 'src/domain/repository';

@Injectable()
export class StudyService {
  constructor(private studyRepository: StudyRepository) {}

  async createStudy(
    study: CreateStudyReqDto,
    userId: number,
  ): Promise<OkResDto> {
    const newStudy = this.studyRepository.create(study);
    newStudy.userId = userId;
    await this.studyRepository.save(newStudy);
    return new OkResDto();
  }

  async updateStudy(
    study: UpdateStudyReqDto,
    userId: number,
  ): Promise<OkResDto> {
    const existStudy = await this.studyRepository.findOneById(study.id);
    if (existStudy.userId !== userId) {
      throw new UnauthorizedException('작성자만이 수정할 수 있습니다.');
    }

    existStudy.content = study.content;
    existStudy.title = study.title;
    existStudy.link = study.link;
    await this.studyRepository.save(existStudy);
    return new OkResDto();
  }

  async getStudy(studyId: number): Promise<GetStudyResDto> {
    const study = await this.studyRepository
      .findOneByIdWithUser(studyId)
      .catch(() => {
        throw new BadRequestException('해당하는 포트폴리오가 없습니다.');
      });
    return new GetStudyResDto(study);
  }

  async getStudyList(userId: number): Promise<GetStudyListResDto[]> {
    const studies = await this.studyRepository
      .findByUserId(userId)
      .catch(() => {
        throw new BadRequestException('해당하는 사용자가 없습니다.');
      });

    return studies.map((study) => new GetStudyListResDto(study));
  }

  async deleteStudy(studyId: number, userId: number): Promise<OkResDto> {
    const study = await this.studyRepository.findOneById(studyId);
    if (study.userId !== userId) {
      throw new UnauthorizedException('작성자만이 삭제할 수 있습니다.');
    }
    study.softRemove();
    return new OkResDto();
  }
}
