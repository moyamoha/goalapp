import {
  BadRequestException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModal: Model<UserDocument>,
  ) {}

  async createUser(userObj): Promise<void> {
    try {
      const hashedPassoword = await bcrypt.hash(userObj.password, 10);
      const newUser = new this.userModal({
        ...userObj,
        password: hashedPassoword,
      }) as UserDocument;
      await newUser.save();
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e, e.message);
    }
  }

  async findOneByEmail(email: string): Promise<UserDocument | undefined> {
    const user = await this.userModal.findOne({ email: email });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userModal.findByIdAndDelete(id);
    if (!user) {
      throw new NotFoundException();
    }
    return;
  }
}
