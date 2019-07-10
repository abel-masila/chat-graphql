import mongoose from "mongoose";
import Joi from "@hapi/joi";
import { UserInputError } from "apollo-server-express";
import { User } from "../models";

import { SignUp } from "./../schemas";

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
    signUp: async (root, args, context, info) => {
      //TODO Make sure one is  Not Authenticated, data validation create user
      //console.log(args);
      //const password = args.password;
      await Joi.validate(args, SignUp, { abortEarly: false });
      return User.create(args);
    }
  }
};
