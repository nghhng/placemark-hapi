import { db } from "../models/db.js";


export const adminController = {
  index: {
    // auth: {
    //   strategy: "session",
    //   scope: "admin",
    // },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      if(loggedInUser.scope==="admin"){
        const users = await db.userStore.getAllUsers();
        const placemarks = await db.placemarkStore.getAllPlacemarks();
        const viewData = {
            title: "Admin",
            users: users,
            placemarks: placemarks,
        };
        return h.view("Admin", viewData);
      } else 
        // eslint-disable-next-line no-else-return
        return h.redirect("/placemark")
      
    },
  },

  deleteUser: {
    handler: async function (request, h) {
      const user = await db.userStore.getUserById(request.params.id);
      await db.userStore.deleteUserById(user._id);
      return h.redirect("/admin");
    },
  },

  deletePlacemark: {
    handler: async function (request, h) {
      const user = await db.placemarkStore.getPlacemarkById(request.params.id);
      await db.placemarkStore.deletePlacemarkById(user._id);
      return h.redirect("/admin");
    },
  },

  makeAdmin: {
    handler: async function (request, h) {
        const user = await db.userStore.getUserById(request.params.id);
        user.scope = "admin";
        await db.userStore.updateUserById(request.params.id, user);
        console.log("Make admin successfully");
        return h.redirect("/admin");
    }
  },

  createCategory: {
    handler: async function (request, h) {
      try{
        await db.categoryStore.category(request.payload.myTitle);
        return h.redirect("/admin");
      } catch(err){
        return h.view("Admin", { errors: [{ message: err.message }] });
      }
    }
  }
};