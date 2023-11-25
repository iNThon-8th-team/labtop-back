import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  BoardRepository,
  LabRepository,
  ResearcherRepository,
  UserRepository,
} from 'src/domain/repository';
import { OkResDto } from 'src/dto';
import { GetBoardResDto, CreateBoardReqDto } from 'src/dto/board';

@Injectable()
export class BoardService {
  constructor(
    private boardRepository: BoardRepository,
    private labRepository: LabRepository,
    private userRepository: UserRepository,
    private researcherRepository: ResearcherRepository,
  ) {}

  async getBoardList(): Promise<GetBoardResDto[]> {
    const board = await this.boardRepository.findAll();
    return await Promise.all(
      board.map(async (board) => {
        const professor = await this.userRepository.findOneById(
          (
            await this.researcherRepository.findByLabId(board.labId)
          ).userId,
        );
        const lab = await this.labRepository.findByIdWithResearchers(
          board.labId,
        );
        return new GetBoardResDto(board, professor, lab);
      }),
    );
  }
}
