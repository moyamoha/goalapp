import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
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
  async getTodo(@Req() req: CustomRequest, @Param('id') id) {
    const todo = await this.todoService.getTodoById(req.user, id);
  }
}
