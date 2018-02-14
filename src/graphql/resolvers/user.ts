import { Resolver } from './';
import { UserModel } from '../../data/models/user-model';
import { TaskModel } from '../../data/models/task-model';
import { sign, verify } from 'jsonwebtoken';
import { v4 } from 'uuid';
const verifyPassword = (userDb: any, input: any) => {
  if (userDb.username !== input.username || userDb.password !== input.password) {
    throw new Error('Username or password is invalid');
  }
};
const userResponse = (userDb: any) => {
  const {
    username,
    createdAt,
    updatedAt,
  } = userDb;
  return {
    id: v4(),
    username,
    createdAt,
    updatedAt,
  };
};
export const addUser: Resolver = async (_, args, context) => {
  try {
    const { input } = args;
    const useDb = await UserModel.create(input) as any;
    const { ip } = context;
    if (useDb) {
      return {
        key: sign({ id: useDb.id, ip }, process.env.SECRET as string),
        user: userResponse(useDb),
      };
    }
    throw new Error('Error on create user');
  } catch (error) {
    throw new Error(error);
  }
  // console.log(dataValues);
};
export const users: Resolver = async (_, args, context) => {
  try {
    const usersDb = await UserModel.findAll({
      include: [
        { model: TaskModel, as: 'tasks' },
      ],
    }) as any;
    return usersDb.map((userDb) => {
      return userResponse(userDb);
    });
  } catch (error) {
    throw new Error(error);
  }
};
export const user: Resolver = async (_, args, context) => {
  try {
    const id = context.user;
    const userDb = await UserModel.findById(id, {
      include: [
        { model: TaskModel, as: 'tasks' },
      ],
    });
    return userResponse(userDb);
  } catch (error) {
    throw new Error(error);
  }
};
export const login: Resolver = async (_, args, context) => {
  try {
    const { input } = args;
    const { ip } = context;
    const userDb = await UserModel.findOne({ where: {username: input.username }}) as any;
    verifyPassword(userDb, input);
    const token = sign({ id: userDb.id, ip }, process.env.SECRET as string);
    console.log('LOGIN: ', input, ' IP: ', ip);
    return {
      key: token,
      user: userResponse(userDb),
    };
  } catch (error) {
    throw new Error(error);
  }
};
