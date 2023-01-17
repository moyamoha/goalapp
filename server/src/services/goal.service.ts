import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

import { UserDocument } from 'src/schemas/user.schema';
import { Goal, GoalDocument } from 'src/schemas/goal.schema';

@Injectable()
export class GoalService {
  constructor(
    @InjectModel(Goal.name)
    private goalModal: Model<GoalDocument>,
  ) {}
  async getAll(user: UserDocument): Promise<GoalDocument[]> {
    const goals = await this.goalModal.find({ userId: user._id });
    return goals;
  }

  async getGoal(
    user: UserDocument,
    goalId: string,
  ): Promise<GoalDocument | null> {
    const goal = await this.goalModal.findById(goalId);
    if (!goal) {
      throw new NotFoundException('The specified goal was not found');
    }
    return goal;
  }

  async createGoal(
    user: UserDocument,
    body: GoalDocument,
  ): Promise<GoalDocument> {
    try {
      const newGoal = new this.goalModal({
        ...body,
        userId: new mongoose.Types.ObjectId(user._id),
      });
      return await newGoal.save();
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async deleteGoal(user: UserDocument, goalId: string) {
    const deletedGoal = await this.goalModal.findOneAndDelete({
      userId: user._id,
      _id: new mongoose.Types.ObjectId(goalId),
    });
    if (!deletedGoal) {
      throw new NotFoundException('The specified goal was not found');
    }
  }

  async editGoal(
    user: UserDocument,
    goalId: string,
    goal: GoalDocument,
  ): Promise<GoalDocument> {
    try {
      await this.goalModal.findOneAndDelete({
        _id: new mongoose.Types.ObjectId(goalId),
        userId: new mongoose.Types.ObjectId(user._id),
      });
      const newGoal = new this.goalModal(goal);
      newGoal.userId = new mongoose.Types.ObjectId(goal.userId);
      return await newGoal.save();
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
