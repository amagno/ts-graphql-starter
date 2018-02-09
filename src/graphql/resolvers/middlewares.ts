import { Resolver } from './index';
import { verify } from 'jsonwebtoken';

type Middleware = (resolver: Resolver) => Resolver;

const userFn = (resolver) => (_, args, context) => {
  return resolver(_, args, context);
  const token = 'asdasd';
  const { id } = verify(token, process.env.SECRET) as any;
};
