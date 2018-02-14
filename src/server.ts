import * as express from 'express';
import * as expressGraphql from 'express-graphql';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import { schema } from './graphql/schema';
import { initDatabase } from './data/init';

initDatabase({ force: false });

const app = express();
const port = process.env.PORT || 3000;
// app.options('*', cors());
app.use(cors());
app.use(cookieParser());
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
