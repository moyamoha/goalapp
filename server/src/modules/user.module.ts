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
  ],
  controllers: [UserController],
  providers: [UserService, TasksService],
})
export class UserModule {}
