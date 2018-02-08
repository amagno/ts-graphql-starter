import { user, users, addUser } from './user';
import { addTask, tasks } from './task';

export type Resolver<T = any> = (_: any, args: any, context: any) => T;

export const resolvers = {
  Query: {
    user,
    users,
    tasks,
  },
  Mutation: {
    addUser,
    addTask,
  },
};
