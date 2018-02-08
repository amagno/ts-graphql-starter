import { database } from '../database';
import { STRING } from 'sequelize';

export const UserModel = database.define('user', {
  username: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      isAlphanumeric: true,
      min: 3,
      max: 50,
    },
  },
  password: {
    type: STRING,
    allowNull: false,
  },
});
