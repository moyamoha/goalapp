import { Injectable, Post } from '@nestjs/common';
import {
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from 'src/schemas/todo.schema';
import { TodoStatus } from 'src/schemas/TodoStatus';
import { UserDocument } from 'src/schemas/user.schema';
import { throwExceptionIfItemNotFoundOrForbidden } from 'src/utils/exceptions';

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
    const todo = await this.todoModel.findById(id).populate('goalId');
    throwExceptionIfItemNotFoundOrForbidden(user, todo);
    return todo;
  }

  async createTodo(
    user: UserDocument,
    todo: Partial<Todo>,
  ): Promise<TodoDocument> {
    try {
      const t = new this.todoModel({ ...todo, owner: user._id });
      const created = await t.save();
      return created.populate('goalId');
    } catch (e) {}
  }

  async markTodoAsCompleted(
    user: UserDocument,
    id: string,
  ): Promise<TodoDocument> {
    const todo = await this.todoModel.findById(id).populate('goalId');
    throwExceptionIfItemNotFoundOrForbidden(user, todo);
    todo.status = TodoStatus.COMPLETED;
    return await todo.save();
  }

  async deleteTodo(user: UserDocument, id: string): Promise<void> {
    const todo = await this.todoModel.findById(id).populate('goalId');
    throwExceptionIfItemNotFoundOrForbidden(user, todo);
    await todo.delete();
  }
}
