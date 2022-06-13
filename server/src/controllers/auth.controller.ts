import { Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LocalAuthGaurd } from 'src/config/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private jwtService: JwtService) {}

  @UseGuards(LocalAuthGaurd)
  @Post('login')
  @HttpCode(200)
  async login(@Req() req): Promise<{ access_token: string }> {
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
      access_token: token,
    };
  }
}
