import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGaurd } from 'src/config/jwt.gaurd';

import { UserDocument } from 'src/schemas/user.schema';
import { UserService } from 'src/services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  @HttpCode(201)
  async registerUser(@Body() body): Promise<void> {
    await this.userService.createUser(body);
  }

  @UseGuards(JwtAuthGaurd)
  @Delete('')
  @HttpCode(204)
  async deleteAccount(@Req() req) {
    const user = req.user as UserDocument;
    await this.userService.deleteUser(user._id);
  }
}
