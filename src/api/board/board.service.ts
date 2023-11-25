import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  BoardRepository,
  LabRepository,
  ResearcherRepository,
  SubscribeRepository,
  UserRepository,
} from 'src/domain/repository';
import { OkResDto } from 'src/dto';
import {
  GetBoardResDto,
  CreateBoardReqDto,
  GetBoardReqDto,
} from 'src/dto/board';

@Injectable()
export class BoardService {
  constructor(
    private boardRepository: BoardRepository,
    private labRepository: LabRepository,
    private userRepository: UserRepository,
    private researcherRepository: ResearcherRepository,
    private subscribeRepository: SubscribeRepository,
  ) {}

  async getBoardList(query: GetBoardReqDto): Promise<GetBoardResDto[]> {
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

  async createBoard(
    board: CreateBoardReqDto,
    userId: number,
  ): Promise<OkResDto> {
    const user = await this.userRepository.findOneById(userId);
    const newBoard = this.boardRepository.create(board);
    if (!user.isResearcher) {
      throw new UnauthorizedException(
        '연구원이 아닐 경우 게시물을 생성할 수 없습니다.',
      );
    }
    const researcher = await this.researcherRepository.findByUserId(userId);
    newBoard.researcherId = researcher.id;
    newBoard.labId = researcher.labId;
    await this.boardRepository.save(newBoard);
    return new OkResDto();
  }
}
