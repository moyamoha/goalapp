import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';

import { AuthService } from 'src/services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.login(email, password);
    if (!user) {
      throw new UnauthorizedException('Email or password is incorrect');
    }
    if (!user.emailConfirmed) {
      throw new UnauthorizedException(
        'User has not confirmed his/her email address',
      );
    }
    return user;
  }
}
