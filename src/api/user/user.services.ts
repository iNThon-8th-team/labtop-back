import { BadRequestException, Injectable } from '@nestjs/common';
import {
  OkResDto,
  GetUserResDto,
  UpdateUserReqDto,
  UpdatePortfolioReqDto,
} from 'src/dto';
import {
  PortfolioRepository,
  SubscribeRepository,
  UserRepository,
} from 'src/domain/repository';
import { Portfolio } from 'src/domain/entity';
import { joinInput } from 'src/common/util/util';
import { GetPortfolioResDto } from 'src/dto/user/get-portfolio-res.dto';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private subscribeRepository: SubscribeRepository,
    private portfolioRepository: PortfolioRepository,
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

  async updatePortfolio(
    portfolio: UpdatePortfolioReqDto,
    userId: number,
  ): Promise<OkResDto> {
    const existPortfolio = await this.portfolioRepository.findOneByUserId(
      userId,
    );
    const newPortfolio = this.portfolioRepository.create({
      ...portfolio,
      certificate: joinInput(portfolio.certificate),
      award: joinInput(portfolio.award),
    });
    newPortfolio.userId = userId;
    newPortfolio.id = existPortfolio ? existPortfolio.id : undefined;
    await this.portfolioRepository.save(newPortfolio);
    return new OkResDto();
  }

  async getPortfolio(userId: number): Promise<GetPortfolioResDto> {
    const portfolio = await this.portfolioRepository.findOneByUserId(userId);
    if (!portfolio) return new GetPortfolioResDto(new Portfolio());
    return new GetPortfolioResDto(portfolio);
  }
}
