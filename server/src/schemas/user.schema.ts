import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true, index: true, unique: true })
  email: string;

  @Prop({
    required: true,
    validate: {
      validator: (v) =>
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-,.;:><]).{8,}$/.test(
          v,
        ),
      message:
        'A password must have at least one lowercase letter, one uppercase letter, one digit and one special character. It should be at least 8 characters long',
    },
  })
  password: string;

  @Prop({ required: true })
  dateOfBirth: Date;

  @Prop({ required: false })
  lastLoggedIn: Date;

  @Prop(
    raw({
      monthsToDelete: {
        type: Number,
        required: false,
        default: 6,
        enum: [3, 6, 12],
      },
      timezoneOffset: {
        type: Number,
        min: -12,
        max: 12,
        default: 0,
        required: false,
      },
      nickname: {
        type: String,
        required: false,
      },
      personality: {
        type: String,
        required: false,
        default: 'dreamer',
        enum: ['dreamer', 'realistic'],
      },
      theme: {
        type: String,
        required: false,
        default: 'system',
        enum: ['system', 'light', 'dark'],
      },
    }),
  )
  profile: any;
}

export const UserSchema = SchemaFactory.createForClass(User);
