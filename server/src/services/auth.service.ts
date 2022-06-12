import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModal: Model<UserDocument>,
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<UserDocument | undefined> {
    const user = await this.userModal.findOne({ email: email });
    if (await bcrypt.compare(password, user.password)) return user;
    else return undefined;
  }
}
