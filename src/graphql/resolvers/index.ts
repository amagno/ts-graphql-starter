import { user, users, addUser, login } from './user';
import { addTask, tasks, deleteTask, editTask, task } from './task';
import { authCookieToken } from './middlewares';
import { addContact, contacts, editContact, contact, deleteContact } from './contact';

export type Resolver<T = any> = (_: any, args: any, context: any) => T;

export const resolvers = {
  Query: {
    user: authCookieToken(user),
    users,
    //  tasks
    tasks: authCookieToken(tasks),
    task: authCookieToken(task),
    // contacts
    contact: authCookieToken(contact),
    contacts: authCookieToken(contacts),
  },
  Mutation: {
    addUser,
    login,
    // tasks
    addTask: authCookieToken(addTask),
    deleteTask: authCookieToken(deleteTask),
    editTask: authCookieToken(editTask),
    // contacts
    addContact: authCookieToken(addContact),
    editContact: authCookieToken(editContact),
    deleteContact: authCookieToken(deleteContact),
  },
};
