import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

import { UserDocument } from 'src/schemas/user.schema';
import { Goal, GoalDocument } from 'src/schemas/goal.schema';
import { throwExceptionIfItemNotFoundOrForbidden } from 'src/utils/exceptions';

@Injectable()
export class GoalService {
  constructor(
    @InjectModel(Goal.name)
    private goalModal: Model<GoalDocument>,
  ) {}
  async getAll(user: UserDocument): Promise<GoalDocument[]> {
    const goals = await this.goalModal.find({ owner: user._id });
    return goals;
  }

  async getGoal(
    user: UserDocument,
    goalId: string,
  ): Promise<GoalDocument | null> {
    const goal = await this.goalModal.findById(goalId);
    throwExceptionIfItemNotFoundOrForbidden(user, goal);
    return goal;
  }

  async createGoal(
    user: UserDocument,
    body: GoalDocument,
  ): Promise<GoalDocument> {
    try {
      const newGoal = new this.goalModal({
        ...body,
        owner: new mongoose.Types.ObjectId(user._id),
      });
      return await newGoal.save();
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async deleteGoal(user: UserDocument, goalId: string): Promise<void> {
    const goalToDelete = await this.goalModal.findById(goalId);
    throwExceptionIfItemNotFoundOrForbidden(user, goalToDelete);
    await goalToDelete.deleteOne();
  }

  async editGoal(
    user: UserDocument,
    goalId: string,
    goal: GoalDocument,
  ): Promise<GoalDocument> {
    try {
      await this.goalModal.findOneAndDelete({
        _id: new mongoose.Types.ObjectId(goalId),
        owner: new mongoose.Types.ObjectId(user._id),
      });
      const newGoal = new this.goalModal(goal);
      newGoal.owner = new mongoose.Types.ObjectId(goal.owner);
      return await newGoal.save();
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
