import { PartialType } from '@nestjs/swagger';
import { Todo } from 'src/schemas/todo.schema';
import { TodoStatus } from 'src/schemas/TodoStatus';

export const getTodosGoalIdQuery = {
  name: 'goalId',
  type: String,
  description:
    'If specified, will return only todos that belong to the goal with id of "goalId"',
  required: true,
};

const exampleTodoComplete = {
  _id: 'string',
  __v: 'number',
  title: 'string',
  description: 'string',
  status: 'string',
  goalId: 'string',
  owner: 'string',
  dateCreated: 'string',
};

export const getTodosOkResponse = {
  status: 200,
  description: 'all the todos',
  type: Todo,
  // example: {
  //   todos: [{
  //     title: ''
  //   }]
  // }
  isArray: true,
};

export const createTodoRequestPayload = {
  description: 'Todo data that is being created',
  examples: {
    body: {
      value: {
        title: 'string',
        description: 'string',
        status: 'string',
        goalId: 'string',
      },
    },
  },
};
