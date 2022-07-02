import Mongoose from "mongoose";
import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

const { Schema } = Mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  scope: String,
  // _id: IdSpec,
  // __v: Joi.number(),
});

export const User = Mongoose.model("User", userSchema);
