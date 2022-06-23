import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';

import { UserDocument } from 'src/schemas/user.schema';
import { GoalDocument } from 'src/schemas/goal.schema';
import { GoalService } from 'src/services/goal.service';
import { JwtAuthGaurd } from 'src/config/jwt.gaurd';

@Controller('goals')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @UseGuards(JwtAuthGaurd)
  @Get()
  async getGoals(@Req() req: any): Promise<GoalDocument[]> {
    const goals = await this.goalService.getAll(req.user as UserDocument);
    return goals;
  }

  @UseGuards(JwtAuthGaurd)
  @Get(':id')
  async getGoal(@Req() req: any, @Param() params): Promise<GoalDocument> {
    const goal = await this.goalService.getGoal(
      req.user as UserDocument,
      params.id,
    );
    return goal;
  }

  @UseGuards(JwtAuthGaurd)
  @Delete(':id')
  @HttpCode(204)
  async deleteGoal(@Req() req: any, @Param() params) {
    await this.goalService.deleteGoal(req.user as UserDocument, params.id);
  }

  @UseGuards(JwtAuthGaurd)
  @Post()
  async createGoal(
    @Req() req: any,
    @Body() body: GoalDocument,
  ): Promise<GoalDocument> {
    return await this.goalService.createGoal(req.user as UserDocument, body);
  }

  @UseGuards(JwtAuthGaurd)
  @Put(':id')
  async editGoal(
    @Req() req: any,
    @Param() params,
    @Body() body: GoalDocument,
  ): Promise<GoalDocument> {
    return await this.goalService.editGoal(
      req.user as UserDocument,
      params.id,
      body,
    );
  }
}
