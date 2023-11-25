import {
  Controller,
  Body,
  Post,
  Get,
  UseGuards,
  Param,
  Query,
  Req,
  Put,
} from '@nestjs/common';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { User } from 'src/domain/entity';
import { JwtAuthGuard } from 'src/common/jwt/jwt-auth-guard';
import {
  CreateBoardReqDto,
  GetBoardListResDto,
  GetBoardReqDto,
  GetBoardResDto,
  OkResDto,
  UpdateBoardReqDto,
} from 'src/dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { BoardService } from './board.service';
import { AuthService } from '../auth/auth.service';
import { Request } from 'express';

@Controller('board')
export class BoardController {
  constructor(
    private authService: AuthService,
    private boardService: BoardService,
  ) {}
  @Get()
  @ApiQuery({ type: GetBoardReqDto })
  @ApiOkResponse({ type: [GetBoardResDto] })
  @ApiOperation({ summary: '게시판 목록 가져오기' })
  async getBoardList(
    @Query() query: GetBoardReqDto,
    @Req() request: Request,
  ): Promise<GetBoardResDto[]> {
    const token = this.authService.decodeToken(request);
    return this.boardService.getBoardList(query, token?.sub);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: OkResDto })
  @ApiOperation({ summary: '게시물 생성하기' })
  async createBoard(
    @GetUser() user: User,
    @Body() board: CreateBoardReqDto,
  ): Promise<OkResDto> {
    return this.boardService.createBoard(board, user.id);
  }

  @Put()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: OkResDto })
  @ApiOperation({ summary: '게시물 수정하기' })
  async updateLab(
    @GetUser() user: User,
    @Body() board: UpdateBoardReqDto,
  ): Promise<OkResDto> {
    return this.boardService.updateBoard(board, user.id);
  }

  @Get('/:labId')
  @ApiOkResponse({ type: OkResDto })
  @ApiOperation({ summary: '연구실의 게시판 목록 가져오기' })
  async getBoardListWithLabId(
    @Param('labId') labId: number,
  ): Promise<GetBoardListResDto[]> {
    return this.boardService.getBoardListWithLabId(labId);
  }
}
