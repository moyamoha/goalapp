import { Injectable, Post } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from 'src/schemas/todo.schema';
import { UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async getAll(
    user: UserDocument,
    goalId: string | undefined,
  ): Promise<TodoDocument[]> {
    const todos = goalId
      ? await this.todoModel.find({ owner: user._id, goalId: goalId })
      : await this.todoModel.find({ owner: user._id });
    return todos;
  }

  async getTodoById(user: UserDocument, id: string): Promise<TodoDocument> {
    const todo = await this.todoModel.findOne({ _id: id, owner: user._id });
    if (!todo) {
      throw new NotFoundException(`Todo with id of ${id} was not found`);
    }
    return todo;
  }

  async createTodo(
    user: UserDocument,
    todo: Partial<Todo>,
  ): Promise<TodoDocument> {
    try {
      const t = new this.todoModel({ ...todo, owner: user._id });
      return await t.save();
    } catch (e) {}
  }
}
