import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import {
  CreateLabReqDto,
  GetLabDetailResDto,
  GetLabListReqDto,
  GetLabListResDto,
  OkResDto,
} from 'src/dto';
import {
  LabRepository,
  SubscribeRepository,
  UserRepository,
} from 'src/domain/repository';
import { UpdateLabReqDto } from 'src/dto/lab/update-lab-req.dto';

@Injectable()
export class LabService {
  constructor(
    private labRepository: LabRepository,
    private userRepository: UserRepository,
    private subscribeRepository: SubscribeRepository,
  ) {}

  async getLabList(query: GetLabListReqDto): Promise<GetLabListResDto[]> {
    const labs = await this.labRepository.findBySearchOption(query);
    return Promise.all(
      labs.map(async (lab) => {
        const professor = await this.userRepository.findOneById(
          lab.professorId,
        );
        return new GetLabListResDto(lab, professor);
      }),
    );
  }

  async createLab(lab: CreateLabReqDto, userId: number): Promise<OkResDto> {
    const user = await this.userRepository.findOneById(userId);
    const newLab = this.labRepository.create(lab);
    if (!user.isProfessor) {
      throw new UnauthorizedException(
        '교수가 아닐 경우 연구실을 생성할 수 없습니다.',
      );
    }
    newLab.professorId = userId;
    await this.labRepository.save(newLab);
    return new OkResDto();
  }

  async updateLab(lab: UpdateLabReqDto, userId: number): Promise<OkResDto> {
    const user = await this.userRepository.findOneById(userId);
    const existLab = await this.labRepository
      .findByIdWithResearchers(lab.id)
      .catch(() => {
        throw new BadRequestException('존재하지 않는 연구실입니다.');
      });
    const isBelongsToLab = existLab.researchers
      .map((researcher) => researcher.userId)
      .includes(user.id);
    if (!isBelongsToLab) {
      throw new UnauthorizedException(
        '소속 연구원이 아닐 경우 연구실을 수정할 수 없습니다.',
      );
    }

    existLab.name = lab.name;
    existLab.category = lab.category;
    existLab.introduction = lab.introduction;
    await this.labRepository.save(existLab);
    return new OkResDto();
  }

  async getLabDetail(
    labId: number,
    userId: number,
  ): Promise<GetLabDetailResDto> {
    const lab = await this.labRepository.findByIdWithResearchsersAndProfessor(
      labId,
    );
    const isSubscribed = await this.subscribeRepository.findOneByUserIdAndLabId(
      userId,
      labId,
    );

    const researchers = (
      await Promise.all(
        lab.researchers.map(async (researcher) => {
          return await this.userRepository.findOneById(researcher.userId);
        }),
      )
    ).filter((researcher) => !researcher.isProfessor);

    return new GetLabDetailResDto(
      lab,
      lab.professor,
      researchers,
      Boolean(isSubscribed),
    );
  }
}
