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
import { Goal, GoalDocument, GoalSchema } from 'src/schemas/goal.schema';
import { GoalService } from 'src/services/goal.service';
import { JwtAuthGaurd } from 'src/config/jwt.gaurd';
import { CustomRequest } from 'src/types/custom';
import {
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
  ApiTags,
  PartialType,
} from '@nestjs/swagger/dist';
import {
  createdGoalResponse,
  createGoalRequestPayload,
} from 'src/swagger/goal';

@Controller('goals')
@ApiBearerAuth('jwt')
@ApiTags('goals')
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
  async getGoal(
    @Req() req: CustomRequest,
    @Param() params,
  ): Promise<GoalDocument> {
    const goal = await this.goalService.getGoal(req.user, params.id);
    return goal;
  }

  @UseGuards(JwtAuthGaurd)
  @Delete(':id')
  @HttpCode(204)
  async deleteGoal(@Req() req: CustomRequest, @Param('id') id: string) {
    await this.goalService.deleteGoal(req.user, id);
  }

  @UseGuards(JwtAuthGaurd)
  @Post()
  @ApiBody(createGoalRequestPayload)
  @ApiResponse(createdGoalResponse)
  async createGoal(
    @Req() req: CustomRequest,
    @Body() body: GoalDocument,
  ): Promise<GoalDocument> {
    return await this.goalService.createGoal(req.user as UserDocument, body);
  }

  @UseGuards(JwtAuthGaurd)
  @Put(':id')
  async editGoal(
    @Req() req: CustomRequest,
    @Param('id') id: string,
    @Body() body: GoalDocument,
  ): Promise<GoalDocument> {
    return await this.goalService.editGoal(req.user as UserDocument, id, body);
  }
}
