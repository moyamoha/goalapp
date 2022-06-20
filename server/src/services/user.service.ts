import {
  BadRequestException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { Goal, GoalDocument } from 'src/schemas/goal.schema';

import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModal: Model<UserDocument>,

    @InjectModel(Goal.name)
    private goalModal: Model<GoalDocument>,
  ) {}

  async createUser(userObj: Partial<UserDocument>): Promise<void> {
    try {
      const mockUser = new this.userModal(userObj);
      await mockUser.validate();
      const hashedPassoword = await bcrypt.hash(userObj.password, 10);
      const newUser = new this.userModal({
        ...userObj,
        password: hashedPassoword,
        profile: userObj.profile ? userObj.profile : {},
      }) as UserDocument;
      await newUser.save({ validateBeforeSave: false }); // Because validation made in line 22
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
    await this.goalModal.deleteMany({ userId: user._id });
    return;
  }

  async editProfile(
    user: UserDocument,
    profile: Partial<UserDocument['profile']>,
  ): Promise<UserDocument['profile']> {
    const testPass = 'Ab1!Ab1!';
    try {
      const mockUser = new this.userModal(user);
      mockUser.profile = profile;
      mockUser.password = testPass;
      await mockUser.validate();
      user.profile = { ...user.profile, ...profile };
      const userProfile = await (
        await user.save({ validateBeforeSave: false })
      ).profile;
      return userProfile;
    } catch (e) {
      throw new BadRequestException(e, e.message);
    }
  }

  async editAccount(
    user: UserDocument,
    accountData: Partial<UserDocument>,
  ): Promise<UserDocument> {
    const testPass = 'Ab1!Ab1!';
    try {
      const mockUser = new this.userModal({ ...user, ...accountData });
      mockUser.password = testPass;
      await mockUser.validate();
      return await this.userModal.findByIdAndUpdate(user._id, accountData, {
        new: true,
      });
    } catch (e) {
      throw new BadRequestException(e, e.message);
    }
  }
}
