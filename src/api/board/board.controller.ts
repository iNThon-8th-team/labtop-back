import {
  Query,
  Controller,
  Body,
  Post,
  Put,
  Get,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { User } from 'src/domain/entity';
import { JwtAuthGuard } from 'src/common/jwt/jwt-auth-guard';
import {
  CreateBoardReqDto,
  GetBoardReqDto,
  GetBoardResDto,
  OkResDto,
} from 'src/dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { BoardService } from './board.service';

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}
  @Get()
  @ApiQuery({ type: GetBoardReqDto })
  @ApiOkResponse({ type: [GetBoardResDto] })
  @ApiOperation({ summary: '게시판 목록 가져오기' })
  async getBoardList(): Promise<GetBoardResDto[]> {
    return this.boardService.getBoardList();
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: OkResDto })
  async createLab(
    @GetUser() user: User,
    @Body() board: CreateBoardReqDto,
  ): Promise<OkResDto> {
    return this.boardService.createBoard(board, user.id);
  }
}
