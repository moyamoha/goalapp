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
    let newUser: UserDocument;
    try {
      const newMockUser = new this.userModal(userObj);
      await newMockUser.validate();
      const hashedPassoword = await bcrypt.hash(userObj.password, 10);
      newUser = new this.userModal({
        ...userObj,
        password: hashedPassoword,
      }) as UserDocument;
      await newUser.save({ validateBeforeSave: false }); // Because validated already in line 22
    } catch (e) {
      throw new BadRequestException(e, e.message);
    }
  }

  async findOneByEmail(email: string): Promise<UserDocument | undefined> {
    const user = await this.userModal.findOne({ email: email });
    if (!user) {
      throw new NotFoundException('Specified user was not found');
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
