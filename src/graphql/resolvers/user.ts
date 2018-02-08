import { Resolver } from './';
import { UserModel } from '../../data/models/user-model';
import { TaskModel } from '../../data/models/task-model';

export const addUser: Resolver = async (_, args, context) => {
  const { input } = args;
  return await UserModel.create(input) as any;
  // console.log(dataValues);
};
export const users: Resolver = async (_, args, context) => {
  return await UserModel.findAll({
    include: [
      { model: TaskModel, as: 'tasks' },
    ],
  });
};
export const user: Resolver = async (_, args, context) => {
  return await UserModel.findById(args.userId, {
    include: [
      { model: TaskModel, as: 'tasks' },
    ],
  });
};
