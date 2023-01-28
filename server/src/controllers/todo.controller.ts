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
import {
  Patch,
  Post,
} from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger/dist';
import { JwtAuthGaurd } from 'src/config/jwt.gaurd';
import { TodoDocument } from 'src/schemas/todo.schema';
import { TodoService } from 'src/services/todo.service';
import {
  changeTodoStatusRequestPayload,
  createTodoRequestPayload,
  getTodosGoalIdQuery,
  getTodosOkResponse,
} from 'src/swagger/todo';
import { changeStatusPayload, CustomRequest } from 'src/types/custom';

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
  @ApiBody(createTodoRequestPayload)
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

  @UseGuards(JwtAuthGaurd)
  @Patch(':id/change-status')
  @HttpCode(204)
  @ApiBody(changeTodoStatusRequestPayload)
  async changeTodoStatus(
    @Req() req: CustomRequest,
    @Body() body: changeStatusPayload,
    @Param('id') id: string,
  ): Promise<void> {
    await this.todoService.changeTodoStatus(req.user, id, body.status);
  }
}
