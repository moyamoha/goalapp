import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGaurd } from 'src/config/jwt.gaurd';
import { TodoService } from 'src/services/todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(JwtAuthGaurd)
  @Get()
  async getTodos() {
    return {};
  }
}
