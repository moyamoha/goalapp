import { Injectable, UnauthorizedException } from '@nestjs/common';
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

  async login(email: string, password: string): Promise<UserDocument> {
    try {
      const user = await this.userModal.findOne({ email: email });
      if (!user.emailConfirmed) {
        throw new UnauthorizedException(
          'User has not activated their email address',
        );
      }
      if (user && (await bcrypt.compare(password, user.password))) {
        /*recording lastloggedin in UTC, the frontend developer is responsible for showing
          local time to the user using the timezoneOffset-field of user's profile 
        */
        user.lastLoggedIn = new Date();
        return await user.save();
      }
    } catch (e) {
      new UnauthorizedException();
    }
  }
}
