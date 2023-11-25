import { Injectable } from '@nestjs/common';
import { GetLabListReqDto, GetLabListResDto } from 'src/dto';
import { LabRepository, UserRepository } from 'src/domain/repository';

@Injectable()
export class LabService {
  constructor(
    private labRepository: LabRepository,
    private userRepository: UserRepository,
  ) {}

  async getLabList(query: GetLabListReqDto) {
    const labs = await this.labRepository.findBySearchOption(query);
    console.log(labs);
    return Promise.all(
      labs.map(async (lab) => {
        const professor = await this.userRepository.findOneById(
          lab.professorId,
        );
        return new GetLabListResDto(lab, professor);
      }),
    );
  }
}
