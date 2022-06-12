import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GoalController } from 'src/controllers/goal.controller';
import { Goal, GoalSchema } from 'src/schemas/goal.schema';
import { GoalService } from 'src/services/goal.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Goal.name, schema: GoalSchema }]),
  ],
  controllers: [GoalController],
  providers: [GoalService],
})
export class GoalModule {}
