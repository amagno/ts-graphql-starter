import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { importSchema } from 'graphql-import';
import { resolvers } from './resolvers';
import { mocks } from './mocks';

// const users = importSchema(__dirname + '/schemas/users.graphql');
// const tasks = importSchema(__dirname + '/schemas/tasks.graphql');
// const root =

const typeDefs = importSchema(__dirname + '/schemas/root.graphql');

export const schema = makeExecutableSchema({ typeDefs, resolvers });

if (process.env.MOCK) {
  addMockFunctionsToSchema({
    schema,
    mocks,
  });
}
