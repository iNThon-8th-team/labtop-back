import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  BoardRepository,
  LabRepository,
  SubscribeRepository,
  UserRepository,
} from 'src/domain/repository';
import { OkResDto } from 'src/dto';
import {
  GetBoardResDto,
  CreateBoardReqDto,
  GetBoardReqDto,
  GetBoardListResDto,
  UpdateBoardReqDto,
} from 'src/dto/board';

@Injectable()
export class BoardService {
  constructor(
    private boardRepository: BoardRepository,
    private labRepository: LabRepository,
    private userRepository: UserRepository,
    private subscribeRepository: SubscribeRepository,
  ) {}

  async getBoardList(
    query: GetBoardReqDto,
    userId: number,
  ): Promise<GetBoardResDto[]> {
    const { subscribe, author } = query;
    if (subscribe && !userId)
      throw new BadRequestException('로그인이 필요합니다.');

    const board = await this.boardRepository.findBySearchOption(query);
    const subscribeList = (
      await this.subscribeRepository.findByUserId(userId)
    ).map((x) => x.labId);
    const res = await Promise.all(
      board.map(async (board) => {
        const author = await this.userRepository.findOneById(userId);
        const lab = await this.labRepository.findOneByIdWithResearchers(
          board.labId,
        );
        const professor = await this.userRepository.findOneById(
          lab.professorId,
        );
        return new GetBoardResDto(board, author, professor, lab);
      }),
    );
    return res
      .filter((board) =>
        subscribe ? subscribeList.includes(board.lab.id) : true,
      )
      .filter((board) =>
        author ? board.author.username.includes(author) : true,
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
    const researcher = await this.userRepository.findOneById(userId);
    newBoard.authorId = userId;
    newBoard.labId = researcher.labId;
    await this.boardRepository.save(newBoard);
    return new OkResDto();
  }

  async updateBoard(
    board: UpdateBoardReqDto,
    userId: number,
  ): Promise<OkResDto> {
    const user = await this.userRepository.findOneById(userId);
    const existBoard = await this.boardRepository
      .findOneById(board.id)
      .catch(() => {
        throw new BadRequestException('존재하지 않는 게시물입니다.');
      });
    const lab = await this.labRepository.findOneByIdWithResearchers(
      existBoard.labId,
    );
    const isBelongsToLab = lab.researchers
      .map((researcher) => researcher.id)
      .includes(user.id);
    if (!isBelongsToLab) {
      throw new UnauthorizedException(
        '소속 연구원이 아닐 경우 게시물을 수정할 수 없습니다.',
      );
    }

    existBoard.title = board.title;
    existBoard.content = board.content;
    existBoard.isNotice = board.isNotice;
    await this.boardRepository.save(existBoard);
    return new OkResDto();
  }

  async getBoardListWithLabId(labId: number): Promise<GetBoardListResDto[]> {
    const boards = await this.boardRepository.findByLabId(labId);
    return boards.map((board) => {
      return new GetBoardListResDto(board);
    });
  }

  async deleteBoard(boardId: number, userId: number): Promise<OkResDto> {
    const board = await this.boardRepository.findOneById(boardId);
    const author = await this.userRepository.findOneById(board.authorId);
    if (author.id !== userId) {
      throw new UnauthorizedException('작성자만이 삭제할 수 있습니다.');
    }
    board.softRemove();
    return new OkResDto();
  }
}
