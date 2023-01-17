import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGaurd } from 'src/config/jwt.gaurd';
import { TodoDocument } from 'src/schemas/todo.schema';
import { TodoService } from 'src/services/todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(JwtAuthGaurd)
  @Get()
  async getTodos(@Req() req: any): Promise<TodoDocument[]> {
    const todos = await this.todoService.getAll(req.user);
    return todos;
  }
}
