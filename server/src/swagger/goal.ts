import { PartialType } from '@nestjs/swagger';
import { Goal } from 'src/schemas/goal.schema';

export const createGoalRequestPayload = {
  type: PartialType(Goal),
  description: 'The body of the goal to be created',
  required: true,
};

// const exampleGoal = {
//   title: 'string',
//   description: 'string',
//   dateCreated: '2023-01-22T12:27:23.069Z',
// };

export const createdGoalResponse = {
  status: 201,
  type: Goal,
};
