import { user, users, addUser, login } from './user';
import { addTask, tasks, deleteTask, editTask, task } from './task';
import { authCookieToken } from './middlewares';

export type Resolver<T = any> = (_: any, args: any, context: any) => T;

export const resolvers = {
  Query: {
    user: authCookieToken(user),
    users,
    tasks: authCookieToken(tasks),
    task: authCookieToken(task),
  },
  Mutation: {
    addUser,
    login,
    addTask: authCookieToken(addTask),
    deleteTask: authCookieToken(deleteTask),
    editTask: authCookieToken(editTask),
  },
};
