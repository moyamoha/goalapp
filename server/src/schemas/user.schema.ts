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
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/.test(
          v,
        ),
      message:
        'A password must have at least one lowercase letter, one uppercase letter, one digit and one special character. It should be 8-30 characters long',
    },
  })
  password: string;

  @Prop({ required: true })
  dateOfBirth: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
