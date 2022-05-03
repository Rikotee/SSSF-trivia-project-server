import bcrypt from 'bcrypt';
import User from '../models/userModel';
import { login } from '../utils/auth';
import { AuthenticationError } from 'apollo-server-express';

export default {
  Query: {
    // find user by id.
    // used when fetching highscores
    user: async (parent, args, context, { user }) => {
      if (!context.user) {
        throw new AuthenticationError('Not authorised');
      }
      return await User.findById(args.id);
    },
    // find list of users that have highscore then fetch 10 best
    users: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not authorised');
      }
      const start = args.start || 0;
      const users = (await User
        .find()
        .skip(start))
        .filter((a) => a.highscoreSD >= 0.1)
        .sort((a, b) => {return b.highscoreSD - a.highscoreSD})
        .slice(0, 10);

      return args.bounds
        ? users.find(): users;
    },
    login: async (parent, args, { req }) => {
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
    // for saving new highscores
    modifyHighscore: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not authorised');
      }
      return await User.findByIdAndUpdate(args.id, args, { new: true });
    },
    modifyHighscoreSD: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not authorised');
      }
      return await User.findByIdAndUpdate(args.id, args, { new: true });
    },
  },
};
