import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { TodoStatus } from './TodoStatus';

export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ default: new Date() })
  dateCreated?: Date;

  @Prop({ default: TodoStatus.DRAFT, required: true })
  status: TodoStatus;

  @Prop({ required: false })
  completedAt: Date;

  @Prop({ ref: 'Goal' })
  goalId: mongoose.Types.ObjectId;

  @Prop({ ref: 'User' })
  owner: mongoose.Types.ObjectId;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
