import { Resolver } from './';
import { UserModel } from '../../data/models/user-model';
import { TaskModel } from '../../data/models/task-model';
import { sign, verify } from 'jsonwebtoken';
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
  try {
    const { id } = args;
    return await UserModel.findById(id, {
      include: [
        { model: TaskModel, as: 'tasks' },
      ],
    });
  } catch (error) {
    throw new Error(error);
  }
};
export const login: Resolver = async (_, args, context) => {
  try {
    const { input } = args;
    const { id } = await UserModel.findOne({ attributes: input }) as any;
    const { ip } = context;
    if (id) {
      const token = sign({ id, ip }, process.env.SECRET);
      return {
        key: token,
      };
    }
    throw new Error(`User login ${input.username} error`);
  } catch (error) {
    throw new Error(error);
  }
};
