import {
  Controller,
  Delete,
  Get,
  Param,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { HttpCode } from '@nestjs/common/decorators';
import { Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import {
  ApiBearerAuth,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger/dist';
import { userInfo } from 'os';
import { JwtAuthGaurd } from 'src/config/jwt.gaurd';
import { Todo, TodoDocument } from 'src/schemas/todo.schema';
import { UserDocument } from 'src/schemas/user.schema';
import { TodoService } from 'src/services/todo.service';
import { getTodosGoalIdQuery, getTodosOkResponse } from 'src/swagger/todo';
import { CustomRequest } from 'src/types/custom';

@Controller('todos')
@ApiBearerAuth('jwt')
@ApiTags('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(JwtAuthGaurd)
  @Get()
  @ApiQuery(getTodosGoalIdQuery)
  @ApiResponse(getTodosOkResponse)
  async getTodos(
    @Req() req: CustomRequest,
    @Query('goalId') goalId: string,
  ): Promise<TodoDocument[]> {
    const todos = await this.todoService.getAll(req.user, goalId);
    return todos;
  }

  @Post()
  @HttpCode(201)
  async createTodo(
    @Req() req: CustomRequest,
    @Body() todo: Partial<TodoDocument>,
  ): Promise<TodoDocument> {
    const createdTodo = await this.todoService.createTodo(req.user, todo);
    return createdTodo;
  }

  @UseGuards(JwtAuthGaurd)
  @Get(':id')
  async getTodo(
    @Req() req: CustomRequest,
    @Param('id') id: string,
  ): Promise<TodoDocument> {
    const todo = await this.todoService.getTodoById(req.user, id);
    return todo;
  }

  @UseGuards(JwtAuthGaurd)
  @Delete(':id')
  @HttpCode(204)
  async deleteTodo(
    @Req() req: CustomRequest,
    @Param('id') id: string,
  ): Promise<void> {
    await this.todoService.deleteTodo(req.user, id);
    return;
  }
}
