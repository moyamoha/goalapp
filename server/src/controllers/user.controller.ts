import { MailerService } from '@nestjs-modules/mailer';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { link } from 'fs';
import { NotFoundError } from 'rxjs';
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
    try {
      const createdUser = await this.userService.createUser(body);
      const link =
        process.env.SITE_ADDRESS + '/users/confirm/?id=' + createdUser.id;
      await this.mailService.sendMail({
        from: process.env.EMAIL_SENDER,
        to: createdUser.email,
        subject: 'Confirm your email',
        text: 'Please confirm your email address',
        html: `<p>Please confirm your email address by clicking<a href="${link}">here</a></p>`,
      });
      return 'success';
    } catch (e) {}
  }

  @Get('confirm')
  async sendTestEmail(@Query() query): Promise<void> {
    try {
      const userId = query.id;
      await this.userService.confirmEmail(userId);
    } catch (e) {
      throw new NotFoundException(e, e.message);
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
