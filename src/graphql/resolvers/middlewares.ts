import { Resolver } from './index';
import { verify } from 'jsonwebtoken';
import { UserModel } from '../../data/models/user-model';

type Middleware = (resolver: Resolver) => Resolver;

// const userFn = (resolver) => (_, args, context) => {
//   return resolver(_, args, context);
//   const token = 'asdasd';
//   const { id } = verify(token, process.env.SECRET) as any;
// };
export const authCookieToken = (resolver: Resolver) => async (_, args, context) => {
  const xToken = context.cookies['x-access-token'] || context.headers['x-access-token'];
  console.log(xToken);
  if (!xToken) {
    throw new Error('Not authorized!');
  }
  const { id } = verify(xToken, process.env.SECRET) as any;
  if (!id) {
    throw new Error('Not authorized!');
  }
  const user = await UserModel.findById(id) as any;
  if (!user) {
    throw new Error('Not authorized!');
  }
  console.log('---> USER_ID  : ', id);
  console.log('---> USER_DB  : ', user.get('username'));
  console.log('---> X_ACCESS : ', xToken);
  context.user = id;
  return resolver(_, args, context);
};
