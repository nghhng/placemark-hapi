import { accountsController } from "./controllers/accounts-controller.js";
import { placemarksController } from "./controllers/placemarks-controller.js";
import { adminController } from "./controllers/admin-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/placemark", config: placemarksController.index },
  { method: "POST", path: "/addplacemark", config: placemarksController.placemark },
  { method: "GET", path: "/report", config: placemarksController.report },
  { method: "GET", path: "/placemark/{id}", config: placemarksController.placemarkInfoIndex },
  { method: "POST", path: "/placemark/{id}/uploadimage", config: placemarksController.uploadImage },

  { method: "GET", path: "/admin", config: adminController.index },
  { method: "GET", path: "/admin/deleteuser/{id}", config: adminController.deleteUser },
  { method: "GET", path: "/admin/deleteplacemark/{id}", config: adminController.deletePlacemark },
  { method: "GET", path: "/admin/makeadmin/{id}", config: adminController.makeAdmin },
  { method: "POST", path: "/addcategory", config: adminController.createCategory },

  {
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: {
        path: "./public",
      },
    },
    options: { auth: false },
  },
];
