import { Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiBody, ApiTags } from '@nestjs/swagger/dist';

import { LocalAuthGaurd } from 'src/config/local.guard';
import { loginRequestBodyPayload } from 'src/swagger/auth';

@Controller('auth')
@ApiTags('authentication')
export class AuthController {
  constructor(private jwtService: JwtService) {}

  @UseGuards(LocalAuthGaurd)
  @Post('login')
  @HttpCode(200)
  @ApiBody(loginRequestBodyPayload)
  async login(@Req() req): Promise<{ accessToken: string }> {
    const user = req.user;
    const token = this.jwtService.sign(
      {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
      {
        secret: process.env.JWT_SECRET,
      },
    );
    return {
      accessToken: token,
    };
  }
}
