import { Injectable } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { BadRequestException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { JwtAuthGaurd } from 'src/config/jwt.gaurd';
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
    console.log(todos);
    return todos;
  }

  async getTodoById(user: UserDocument, id: string): Promise<TodoDocument> {
    const todo = await this.todoModel.findById(id).populate('goalId');
    throwExceptionIfItemNotFoundOrForbidden(user, todo);
    return todo;
  }

  async createTodo(
    user: UserDocument,
    todo: TodoDocument,
  ): Promise<TodoDocument> {
    try {
      const t = new this.todoModel({
        ...todo,
        owner: new mongoose.Types.ObjectId(user._id),
        status: TodoStatus.DRAFT,
        dateCreated: new Date(),
      });
      return await t.save();
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async changeTodoStatus(
    user: UserDocument,
    id: string,
    newStatus: TodoStatus,
  ): Promise<TodoDocument> {
    const todo = await this.todoModel.findById(id).populate('goalId');
    throwExceptionIfItemNotFoundOrForbidden(user, todo);
    try {
      todo.status = newStatus;
      return await todo.save();
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async deleteTodo(user: UserDocument, id: string): Promise<void> {
    const todo = await this.todoModel.findById(id).populate('goalId');
    throwExceptionIfItemNotFoundOrForbidden(user, todo);
    await todo.delete();
  }
}
