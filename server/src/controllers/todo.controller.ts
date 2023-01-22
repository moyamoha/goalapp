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
import { JwtAuthGaurd } from 'src/config/jwt.gaurd';
import { TodoDocument } from 'src/schemas/todo.schema';
import { TodoService } from 'src/services/todo.service';
import { CustomRequest } from 'src/types/custom';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(JwtAuthGaurd)
  @Get()
  async getTodos(
    @Req() req: CustomRequest,
    @Query('goalId') goalId,
  ): Promise<TodoDocument[]> {
    const todos = await this.todoService.getAll(req.user, goalId);
    return todos;
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
