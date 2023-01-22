import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';

export type GoalDocument = Goal & Document;

@Schema()
export class Goal {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ default: new Date() })
  dateCreated?: Date;

  @Prop({
    max: [5, 'A goal can have importance score no more than 5'],
    min: [1, 'A goal can not only have importance score less than 1'],
    default: 3,
    required: true,
  })
  importance: number;

  @Prop(
    raw({
      date: {
        type: Date,
      },
      celebrationText: String,
    }),
  )
  reached?: any;

  @Prop()
  targetDate?: Date;

  @Prop({ ref: 'User' })
  owner: mongoose.Types.ObjectId;
}

export const GoalSchema = SchemaFactory.createForClass(Goal);
