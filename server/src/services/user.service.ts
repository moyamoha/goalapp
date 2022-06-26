import { MailerService } from '@nestjs-modules/mailer';
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

    private mailService: MailerService,
  ) {}

  async createUser(userObj: Partial<UserDocument>): Promise<UserDocument> {
    try {
      const mockUser = new this.userModal(userObj);
      await mockUser.validate();
      const hashedPassoword = await bcrypt.hash(userObj.password, 10);
      const newUser = new this.userModal({
        ...userObj,
        password: hashedPassoword,
      }) as UserDocument;
      return await newUser.save({ validateBeforeSave: false }); // Because validation made in line 22
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

  async confirmEmail(userId: string): Promise<void> {
    try {
      const user = await this.userModal.findById(userId);
      user.emailConfirmed = true;
      await user.save({ validateBeforeSave: false });
    } catch (e) {
      throw new NotFoundException('User ' + userId + ' not found');
    }
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
    await this.mailService.sendMail({
      from: process.env.EMAIL_SENDER,
      to: user.email,
      subject: 'Your account was DELETED',
      html: `<strong>
        Dear ${user.firstname}!
      </strong><br></br>
        <p>We are sad to see you leave, but you can create a new one anytime
        <a href="https://goalie.netlify.app">here</a>
      </p>`,
    });
    return;
  }

  async editUser(
    user: UserDocument,
    data: Partial<UserDocument>,
  ): Promise<UserDocument> {
    const testPass = 'Ab1!Ab1!';
    try {
      const mockUser = new this.userModal({ ...user, ...data });
      mockUser.password = testPass;
      await mockUser.validate();
      const updated = await this.userModal.findByIdAndUpdate(user._id, data, {
        new: true,
      });
      return updated;
    } catch (e) {
      throw new BadRequestException(e, e.message);
    }
  }
}
