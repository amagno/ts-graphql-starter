import { database } from '../database';
import { STRING, INTEGER, BOOLEAN } from 'sequelize';

export const ContactModel = database.define('contact', {
  name: {
    type: STRING,
    allowNull: false,
  },
  isPublic: {
    type: BOOLEAN,
    defaultValue: false,
  },
  isFavorite: {
    type: BOOLEAN,
    defaultValue: false,
  },
  email: {
    type: STRING,
    unique: true,
    validate: {
      isEmail: true,
    },
    allowNull: false,
  },
  phone: {
    type: INTEGER,
    allowNull: true,
    validate: {
      isInt: true,
    },
  },
  company: {
    type: STRING,
    allowNull: true,
  },
  address: {
    type: STRING,
    allowNull: true,
  },
});
