import { Resolver } from './';
import { UserModel } from '../../data/models/user-model';
import { TaskModel } from '../../data/models/task-model';
import { v4 } from 'uuid';
export const addTask: Resolver = async (_, args, context) => {
  try {
    const inputTask = {
      userId: context.user,
      checked: false,
      ...args.input,
    };
    const createdTask = await TaskModel.create(inputTask) as any;
    const { username } = await UserModel.findById(context.user) as any;
    return {
      id: createdTask.get('id'),
      name: createdTask.get('name'),
      checked: createdTask.get('checked') ? true : false,
      updatedAt: createdTask.get('updatedAt'),
      createdAt: createdTask.get('createdAt'),
      user: {
        id: v4(),
        username,
      },
    };
  } catch (error) {
    console.log(error);
  }
};
export const tasks: Resolver = async (_, args, context) => {
  return await TaskModel.findAll({
    order: [['createdAt', 'DESC']],
    where: { userId: context.user },
    include: [
      { model: UserModel, as: 'user' },
    ],
  });
};
export const deleteTask: Resolver = async (_, args, context) => {
  const { id } = args;
  const removedTask = await TaskModel.findById(id,  {
    where: {
      userId: context.user,
    },
    include: [
      { model: UserModel, as: 'user' },
    ],
  }) as any;
  if (!removedTask) {
    throw new Error(`Task: ${id} not exists for delete`);
  }
  removedTask.destroy();
  return removedTask;
};
export const editTask: Resolver = async (_, args, context) => {
  try {
    const { id } = args;
    const updateTask = await TaskModel.findById(id,  {
      where: {
        userId: context.user,
      },
      include: [
        { model: UserModel, as: 'user' },
      ],
    }) as any;
    if (!updateTask) {
      throw new Error(`Task: ${id} not exists for edit`);
    }
    for (const key of Object.keys(args.input)) {
      updateTask[key] = args.input[key];
    }
    updateTask.save();
    return updateTask;
  } catch (error) {
    throw new Error(error);
  }
};
export const task: Resolver = async (_, args, context) => {
  try {
    const gtask = await TaskModel.findById(args.id, {
      where: {
        userId: context.user,
      },
      include: [
        {
          model: UserModel, as: 'user',
        },
      ],
    });
    if (!gtask) {
      throw new Error(`task: ${args.id} not found`);
    }
    return gtask;
  } catch (error) {
    throw new Error(error);
  }
};
