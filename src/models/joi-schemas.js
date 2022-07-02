import Joi from "joi";
import { IdSpec } from "./mongo/user.js";

export const UserCredentialsSpec = Joi.object()
.keys({
    email: Joi.string().email().example("homer@gmail.com").required(),
    password: Joi.string().required(),
})
.label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpec).label("UserArray");
export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");




  
export const PlacemarkSpec = {
    name: Joi.string().required(),
    lat: Joi.string().required(),
    lng: Joi.string().required(),
    description: Joi.string().allow("").optional(),
    category: Joi.string()
};