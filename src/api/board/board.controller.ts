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
  CreateLabReqDto,
  GetLabListReqDto,
  GetLabListResDto,
  OkResDto,
} from 'src/dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { BoardService } from './board.service';
import { GetBoardListResDto } from 'src/dto/board/get-board-list-res.dto';
import { GetBoardListReqDto } from 'src/dto/board/get-board-list-req.dto';

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}
  @Get()
  @ApiQuery({ type: GetBoardListReqDto })
  @ApiOkResponse({ type: [GetBoardListResDto] })
  @ApiOperation({ summary: '게시판 목록 가져오기' })
  async getBoardList(): Promise<GetBoardListResDto[]> {
    return this.boardService.getBoardList();
  }
}
