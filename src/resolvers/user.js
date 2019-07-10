import mongoose from "mongoose";
import { UserInputError } from "apollo-server-express";
import { User } from "../models";

export default {
  Query: {
    users: (root, args, context, info) => {
      //TODO Make sure one is Authenticated, Projection, pagination
      return User.find({});
    },
    user: (root, { id }, context, info) => {
      //check if args id is valid id
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid user id`);
      }
      //TODO Make sure one is Authenticated, Projection, pagination
      return User.findById(id);
    }
  },

  Mutation: {
    signUp: (root, args, context, info) => {
      //TODO Make sure one is  Not Authenticated, data validation create user
      //console.log(args);
      return User.create(args);
    }
  }
};
