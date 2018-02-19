import { verifyConnection } from './database';
import { TaskModel } from './models/task-model';
import { UserModel } from './models/user-model';
import { ContactModel } from './models/contact-model';

export const initDatabase = ({ force } = { force: false }) => {
  verifyConnection
  .then(() => {
    console.log('Database SQLITE is ready to use');
    UserModel.hasMany(TaskModel);
    TaskModel.belongsTo(UserModel);
    UserModel.hasMany(ContactModel);
    ContactModel.belongsTo(UserModel);
    TaskModel.sync({ force });
    UserModel.sync({ force });
    ContactModel.sync({ force });
  })
  .catch((error) => {
    console.log('Database connection error!', error);
  });
};
