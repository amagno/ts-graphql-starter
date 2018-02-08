import { MockList } from 'graphql-tools';

export const mocks = {
  Query: () => ({
    users: () => new MockList(100),
  }),
};
