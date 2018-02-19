import { Resolver } from './';
import { ContactModel } from '../../data/models/contact-model';
import { UserModel } from '../../data/models/user-model';

export const addContact: Resolver = async (_, args, context) => {
  const { input } = args;

  try {
    // const user = await UserModel.findById(context.user) as any;
    // if (!user) {
    //   throw new Error('User not found!');
    // }
    console.log(input);
    // return await user.addContact(input);
    const phone = input.phone && input.phone.length ? parseInt(input.phone, 0) : null;
    console.log(phone);
    return await ContactModel.create({
      ...input,
      phone,
      userId: context.user,
    }, {
      include: [
        { model: UserModel, as: 'user' },
      ],
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const contacts: Resolver = async (_, args, context) => {
  try {
    return await ContactModel.findAll({
      where: {
        userId: context.user,
      },
      include: [
        { model: UserModel, as: 'user' },
      ],
    });
  } catch (error) {
    throw new Error(error);
  }
};
export const editContact: Resolver = async (_, args, context) => {
  try {
    // const user = await UserModel.findById(context.user) as any;
    // if (!user) {
    //   throw new Error('User not found!');
    // }
    const { input, id } = args;
    // return await user.addContact(input);
    const phone = input.phone && input.phone.length ? parseInt(input.phone, 0) : null;
    const sanitizedInput = {
      ...input,
      phone,
    };
    console.log(sanitizedInput);
    const contactUpdate = await ContactModel.findById(id, {
      where: {
        useId: context.user,
      },
      include: [
        { model: UserModel, as: 'user' },
      ],
    }) as any;
    Object.keys(sanitizedInput).forEach((key) => {
      contactUpdate[key] = sanitizedInput[key];
    });
    contactUpdate.save();
    return contactUpdate;
  } catch (error) {
    throw new Error(error);
  }
};
export const contact: Resolver = async (_, args, context) => {
  try {
    return await ContactModel.findById(args.id, {
      where: {
        userId: context.user,
      },
      include: [
        { model: UserModel, as: 'user' },
      ],
    });
  } catch (error) {
    throw new Error(error);
  }
};
