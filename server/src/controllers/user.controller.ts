import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGaurd } from 'src/config/jwt.gaurd';

import { UserDocument } from 'src/schemas/user.schema';
import { UserService } from 'src/services/user.service';
import { CustomRequest } from 'src/types/custom';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  @HttpCode(201)
  async registerUser(@Body() body: Partial<UserDocument>): Promise<void> {
    await this.userService.createUser(body);
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
  async editAccount(
    @Req() req: CustomRequest,
    @Body() body: Partial<UserDocument>,
  ) {
    const updated = await this.userService.editAccount(req.user, body);
    return {
      email: updated.email,
      firstname: updated.firstname,
      lastname: updated.lastname,
      dateOfBirth: updated.dateOfBirth,
    };
  }

  @UseGuards(JwtAuthGaurd)
  @Put('profile')
  async editProfile(
    @Req() req: CustomRequest,
    @Body() body: Partial<UserDocument['profile']>,
  ) {
    const profile = this.userService.editProfile(req.user, body);
    return profile;
  }
}
