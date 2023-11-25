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
import { GetBoardResDto } from 'src/dto/board/get-board-res.dto';
import { GetBoardReqDto } from 'src/dto/board/get-board-req.dto';

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
}
