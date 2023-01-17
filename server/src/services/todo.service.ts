import { Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from 'src/schemas/todo.schema';
import { UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async getAll(user: UserDocument): Promise<TodoDocument[]> {
    return this.todoModel.find({ owner: user._id });
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
