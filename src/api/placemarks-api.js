import Boom from "@hapi/boom";
import {db} from "../models/db.js";

export const placemarksApi = {
  findAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const placemarks = db.placemarkStore.getAllPlacemarks();
      return placemarks;
    },
  },
  findByCategory: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const placemarks = await db.placemarkStore.getPlacemarksByCategory(request.params.id);
      return placemarks;
    },
  },

  makePlacemark: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const category = await db.categoryStore.findById(request.params.id);
      if (!category) {
        return Boom.notFound("No Category with this id");
      }
      const placemark = await db.placemarkStore.placemark(
          request.payload.name,
          request.payload.description,
          request.auth.credentials,
          category,
          request.payload.lat,
          request.payload.lng,
      );
      return placemark;
    },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      await db.placemarkStore.deleteAll();
      return {success: true};
    },
  },
};
