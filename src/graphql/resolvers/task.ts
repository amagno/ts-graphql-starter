import { Resolver } from './';
import { UserModel } from '../../data/models/user-model';
import { TaskModel } from '../../data/models/task-model';

export const addTask: Resolver = async (_, args, context) => {
  try {
    const user = await UserModel.findById(args.userId) as any;
    const allTasks = await TaskModel.findAll() || [];
    if (!user) {
      throw new Error(`User ${args.userId} not foud!`);
    }
    const userId = user.get('id');
    const task = {
      userId,
      checked: false,
      ...args.input,
      order: (allTasks.length + 1),
    };
    const createdTask = await TaskModel.create(task) as any;
    return {
      id: createdTask.get('id'),
      name: createdTask.get('name'),
      checked: createdTask.get('checked'),
      order: createdTask.get('order'),
      user,
    };
  } catch (error) {
    console.log(error);
  }
};
export const tasks: Resolver = async (_, args, context) => {
  return await TaskModel.findAll({
    include: [
      { model: UserModel, as: 'user' },
    ],
  });
};
