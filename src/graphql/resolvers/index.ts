import { user, users, addUser, login } from './user';
import { addTask, tasks } from './task';

export type Resolver<T = any> = (_: any, args: any, context: any) => T;

const authLogin = (resolver: Resolver): Resolver => {
  return resolver;
};

export const resolvers = {
  Query: {
    user,
    users,
    tasks,
  },
  Mutation: {
    addUser,
    addTask,
    login,
  },
};
