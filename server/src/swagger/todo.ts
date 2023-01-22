import { Todo } from 'src/schemas/todo.schema';

export const getTodosGoalIdQuery = {
  name: 'goalId',
  type: String,
  description:
    'If specified, will return only todos that belong to the goal with id of "goalId"',
  required: true,
};

export const getTodosOkResponse = {
  status: 200,
  description: 'all the todos',
  type: Todo,
  isArray: true,
};
