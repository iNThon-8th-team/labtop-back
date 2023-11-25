import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LabRepository, UserRepository } from 'src/domain/repository';
import { OkResDto } from 'src/dto';

@Injectable()
export class ImageService {
  constructor(
    private labRepository: LabRepository,
    private userRepository: UserRepository,
  ) {}

  async uploadUserImage(
    path: string,
    userId: number,
    targetId: number,
  ): Promise<OkResDto> {
    const user = await this.userRepository.findOneById(targetId);
    if (!userId || userId != user.id) {
      throw new UnauthorizedException('권한이 없습니다.');
    }
    user.profile = path;
    await this.userRepository.save(user);
    return new OkResDto();
  }

  async uploadLabImage(
    path: string,
    userId: number,
    targetId: number,
  ): Promise<OkResDto> {
    const lab = await this.labRepository.findOneByIdWithResearchers(targetId);
    const researcher = await this.userRepository.findOneById(userId);
    if (!userId || !lab.researchers.map((x) => x.id).includes(researcher.id)) {
      throw new UnauthorizedException('권한이 없습니다.');
    }
    lab.image = path;
    await this.labRepository.save(lab);
    return new OkResDto();
  }
}
