import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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
}

export const UserSchema = SchemaFactory.createForClass(User);
