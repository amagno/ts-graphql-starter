import * as Sequelize from 'sequelize';
import { TaskModel } from './models/task-model';

export const database = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
  logging: true,
});

export const verifyConnection = database.authenticate();
