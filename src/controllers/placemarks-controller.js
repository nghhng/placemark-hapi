import { db } from "../models/db.js";
import { PlacemarkSpec } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";

export const placemarksController = {
  index: {
    handler: async function (request, h) {
      const categories = await db.categoryStore.getAllCategories();
      return h.view("Placemark", { title: "Make a Placemark", categories: categories });
    },
  },

  placemarkInfoIndex: {
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      return h.view("PlacemarkInfo", { title: "Placemark Info", placemark: placemark });
    },
  },

  report: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      console.log(loggedInUser._id);
      const placemarks = await db.placemarkStore.getPlacemarksByUser(loggedInUser._id);
      // let total = 0;
      // placemarks.forEach((placemark) => {
      //   total += placemark.name;
      // });
      return h.view("Report", {
        title: "Placemarks List",
        placemarks: placemarks,
        // total: total,
      });
    },
  },
  placemark: {
    validate: {
      payload: PlacemarkSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("Placemark", { title: "Add Placemark error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      try {
        const loggedInUser = request.auth.credentials;
        console.log(request.payload.category)
        const rawCategory = request.payload.category;
        const category = await db.categoryStore.findByTitle(rawCategory);
        await db.placemarkStore.placemark(request.payload.name, request.payload.description, loggedInUser, category, request.payload.lat, request.payload.lng);
        console.log("Save done");
        return h.redirect("/report");
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    },
  },

  uploadImage: {
    handler: async function(request, h) {
      try {
        console.log(request.params._id)
        const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
        console.log(placemark);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          placemark.img = url;
          db.placemarkStore.updatePlacemark(placemark);
        }
        return h.redirect(`/placemark/${placemark._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/placemark/${request.params.id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true
    }
  }
};
