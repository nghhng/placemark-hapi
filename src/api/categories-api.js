import Boom from "@hapi/boom";
import { Category } from "../models/mongo/category.js";

export const categoriesApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const categories = await Category.find();
      return categories;
    },
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const category = await Category.findOne({ _id: request.params.id });
        if (!category) {
          return Boom.notFound("No Category with this id");
        }
        return category;
      } catch (err) {
        return Boom.notFound("No Category with this id");
      }
    },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const newCategory = new Category(request.payload);
      const category = await newCategory.save();
      if (category) {
        return h.response(category).code(201);
      }
      return Boom.badImplementation("error creating category");
    },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      await Category.remove({});
      return { success: true };
    },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const response = await Category.deleteOne({ _id: request.params.id });
      // eslint-disable-next-line eqeqeq
      if (response.deletedCount == 1) {
        return { success: true };
      }
      return Boom.notFound("id not found");
    },
  },
};
