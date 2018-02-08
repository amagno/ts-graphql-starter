import * as express from 'express';
import * as expressGraphql from 'express-graphql';
import * as cors from 'cors';
import { schema } from './graphql/schema';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.redirect('/graphql');
});

app.use('/graphql', expressGraphql({
  graphiql: true,
  schema,
}));

app.listen(port, () => {
  console.log(`GraphqlApi is running on http://locahost:${port}/`);
});
