import { BadRequestException, Injectable } from '@nestjs/common';
import { OkResDto, GetUserResDto, UpdateUserReqDto } from 'src/dto';
import { SubscribeRepository, UserRepository } from 'src/domain/repository';
import { Subscribe } from 'src/domain/entity';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private subscribeRepository: SubscribeRepository,
  ) {}

  async subscribe(labId: number, userId: number): Promise<OkResDto> {
    const sub = this.subscribeRepository.create();
    sub.labId = labId;
    sub.userId = userId;
    await this.subscribeRepository.save(sub);
    return new OkResDto();
  }

  async unsubscribe(labId: number, userId: number): Promise<OkResDto> {
    const sub = await this.subscribeRepository.findOneByUserIdAndLabId(
      userId,
      labId,
    );
    await this.subscribeRepository.remove(sub);
    return new OkResDto();
  }

  async getUser(userId: number): Promise<GetUserResDto> {
    const user = await this.userRepository.findOneById(userId).catch(() => {
      throw new BadRequestException('해당하는 사용자 정보가 없습니다.');
    });
    return new GetUserResDto(user);
  }

  async updateUser(study: UpdateUserReqDto, userId: number): Promise<OkResDto> {
    const user = await this.userRepository.findOneById(userId).catch(() => {
      throw new BadRequestException('해당하는 사용자 정보가 없습니다.');
    });
    user.introduction = study.introduction;
    user.username = study.username;
    await this.userRepository.save(user);
    return new OkResDto();
  }
}
