import {
  BadRequestException,
  NotFoundException,
  Injectable,
  Redirect,
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

  async createUser(userObj: Partial<UserDocument>): Promise<void> {
    try {
      const mockUser = new this.userModal(userObj);
      await mockUser.validate();
      const hashedPassoword = await bcrypt.hash(userObj.password, 10);
      console.log(hashedPassoword);
      const newUser = new this.userModal({
        ...userObj,
        password: hashedPassoword,
        profile: userObj.profile ? userObj.profile : {},
      }) as UserDocument;
      await newUser.save({ validateBeforeSave: false }); // Because validation made in line 22
      Redirect('/auth/login', 201);
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

  async getAll(): Promise<UserDocument[]> {
    return await this.userModal.find({});
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userModal.findByIdAndDelete(id);
    if (!user) {
      throw new NotFoundException();
    }
    return;
  }

  async editProfile(
    user: UserDocument,
    profile: Partial<UserDocument['profile']>,
  ): Promise<UserDocument> {
    const testPass = 'Ab1!Ab1!';
    try {
      const mockUser = new this.userModal(user);
      mockUser.profile = profile;
      mockUser.password = testPass;
      await mockUser.validate();
      user.profile = { ...user.profile, ...profile };
      return await user.save({ validateBeforeSave: false });
    } catch (e) {
      throw new BadRequestException(e, e.message);
    }
  }
}
