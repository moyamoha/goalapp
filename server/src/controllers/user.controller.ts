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
import { ApiTags } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger/dist';
import { JwtAuthGaurd } from 'src/config/jwt.gaurd';

import { UserDocument } from 'src/schemas/user.schema';
import { UserService } from 'src/services/user.service';
import { CustomRequest } from 'src/types/custom';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  @HttpCode(201)
  async registerUser(@Body() body: Partial<UserDocument>): Promise<void> {
    await this.userService.createUser(body);
  }

  @ApiBearerAuth()
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
    };
  }
}
