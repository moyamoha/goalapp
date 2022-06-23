import { MailerService } from '@nestjs-modules/mailer';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGaurd } from 'src/config/jwt.gaurd';

import { UserDocument } from 'src/schemas/user.schema';
import { UserService } from 'src/services/user.service';
import { CustomRequest } from 'src/types/custom';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private mailService: MailerService,
  ) {}

  @Post('')
  @HttpCode(201)
  async registerUser(@Body() body: Partial<UserDocument>): Promise<string> {
    const createdUser = await this.userService.createUser(body);
    await this.mailService.sendMail({
      from: process.env.EMAIL_SENDER,
      to: createdUser.email,
    });
    return 'success';
  }

  @Get('confirm')
  async sendTestEmail(): Promise<void> {
    try {
      await this.mailService.sendMail({
        from: process.env.EMAIL_SENDER,
        to: 'salimiyahya50@gmail.com',
        subject: 'Test',
        text: 'This is just a test',
        html: '<p>This is just a test</p>',
      });
    } catch (e) {
      console.log(e);
    }
  }

  @UseGuards(JwtAuthGaurd)
  @Delete('')
  @HttpCode(204)
  async deleteAccount(@Req() req: CustomRequest) {
    const user = req.user;
    await this.userService.deleteUser(user._id);
  }

  @UseGuards(JwtAuthGaurd)
  @Put('')
  async editUser(
    @Req() req: CustomRequest,
    @Body() body: Partial<UserDocument>,
  ) {
    const updated = await this.userService.editUser(req.user, body);
    return {
      email: updated.email,
      firstname: updated.firstname,
      lastname: updated.lastname,
      dateOfBirth: updated.dateOfBirth,
      monthsToDelete: updated.monthsToDelete,
    };
  }
}
