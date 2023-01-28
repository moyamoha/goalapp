import { Request } from 'express';
import { GoalDocument } from 'src/schemas/goal.schema';
import { TodoDocument } from 'src/schemas/todo.schema';
import { TodoStatus } from 'src/schemas/TodoStatus';
import { UserDocument } from 'src/schemas/user.schema';

export interface CustomRequest extends Request {
  user?: UserDocument;
  todo?: TodoDocument;
}

export enum ItemType {
  TODO = 'Todo',
  GOAL = 'Goal',
  USER = 'User',
}

export type IEntity = TodoDocument | GoalDocument;

export type changeStatusPayload = {
  status: TodoStatus;
};
