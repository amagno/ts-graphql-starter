import { database } from '../database';
import { BOOLEAN, STRING, INTEGER } from 'sequelize';

export const TaskModel = database.define('task', {
  name: {
    type: STRING,
    allowNull: false,
  },
  checked: {
    type: BOOLEAN,
    defaultValue: false,
  },
});
