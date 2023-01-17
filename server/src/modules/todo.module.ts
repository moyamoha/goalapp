import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoController } from 'src/controllers/todo.controller';
import { Todo, TodoSchema } from 'src/schemas/todo.schema';
import { GoalService } from 'src/services/goal.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
  ],
  controllers: [TodoController],
  providers: [GoalService],
})
export class TodoModule {}
