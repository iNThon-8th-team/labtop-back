import { Injectable } from '@nestjs/common';
import {
  BoardRepository,
  LabRepository,
  ResearcherRepository,
  UserRepository,
} from 'src/domain/repository';
import { GetBoardListResDto } from 'src/dto/board/get-board-list-res.dto';

@Injectable()
export class BoardService {
  constructor(
    private boardRepository: BoardRepository,
    private labRepository: LabRepository,
    private userRepository: UserRepository,
    private researcherRepository: ResearcherRepository,
  ) {}

  async getBoardList(): Promise<GetBoardListResDto[]> {
    const board = await this.boardRepository.findAll();
    return Promise.all(
      board.map(async (board) => {
        const professor = await this.userRepository.findOneById(
          (
            await this.researcherRepository.findByLabId(board.labId)
          ).userId,
        );
        const lab = await this.labRepository.findByIdWithResearchers(
          board.labId,
        );
        return new GetBoardListResDto(board, professor, lab);
      }),
    );
  }
}
