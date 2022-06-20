import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/config/local.strategy';
import { TokenStrategy } from 'src/config/token.strategy';
import { AuthController } from 'src/controllers/auth.controller';
import { Goal, GoalSchema } from 'src/schemas/goal.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Goal.name, schema: GoalSchema }]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    JwtService,
    LocalStrategy,
    TokenStrategy,
  ],
})
export class AuthModule {}
