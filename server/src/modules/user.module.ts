import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

import { UserController } from 'src/controllers/user.controller';
import { Goal, GoalSchema } from 'src/schemas/goal.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { TasksService } from 'src/services/task.service';
import { UserService } from 'src/services/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Goal.name, schema: GoalSchema }]),
    ScheduleModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: process.env.SENDGRID_SERVER,
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_API_KEY,
        },
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, TasksService],
})
export class UserModule {}
