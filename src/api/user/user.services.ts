import { BadRequestException, Injectable } from '@nestjs/common';
import { OkResDto, GetUserResDto, UpdateUserReqDto } from 'src/dto';
import { UserRepository } from 'src/domain/repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

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
