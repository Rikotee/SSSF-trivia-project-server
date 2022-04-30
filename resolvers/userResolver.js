import bcrypt from 'bcrypt';
import User from '../models/userModel';
import { login } from '../utils/auth';
import { AuthenticationError } from 'apollo-server-express';

export default {
  Query: {
    user: async (parent, args, { user }) => {
      console.log('userResolver', user);
      // find user by id
      return await User.findById(args.id);
    },
    // find list of users
    users: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not authorised');
      }
      const start = args.start || 0;
      const limit = args.limit || 10;
      const users = (await User
        .find()
        .skip(start)
        .limit(limit))
        .filter((a) => a.highscore >= 0.1)
        .sort((a, b) => {return b.highscore - a.highscore});

      return args.bounds
        ? users.find(): users;
    },
    login: async (parent, args, { req }) => {
      // get username and password from query
      // and add to req.body for passport
      req.body = args;
      return await login(req);
    },
  },
  Mutation: {
    registerUser: async (parent, args) => {
      try {
        const hash = await bcrypt.hash(args.password, 12);
        const userWithHash = {
          ...args,
          password: hash,
        };
        const newUser = new User(userWithHash);
        const result = await newUser.save();
        return result;
      } catch (err) {
        throw new Error(err);
      }
    },
    modifyHighscore: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not authorised');
      }
      return await User.findByIdAndUpdate(args.id, args, { new: true });
    },
  },
};
