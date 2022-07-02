import { userApi } from "./api/users-api.js";
import { placemarksApi } from "./api/placemarks-api.js";
import { categoriesApi } from "./api/categories-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "GET", path: "/api/placemarks", config: placemarksApi.findAll },
  { method: "GET", path: "/api/categories/{id}/placemarks", config: placemarksApi.findByCategory },
  { method: "POST", path: "/api/categories/{id}/placemarks", config: placemarksApi.makePlacemark },
  { method: "DELETE", path: "/api/placemarks", config: placemarksApi.deleteAll },

  { method: "GET", path: "/api/categories", config: categoriesApi.find },
  { method: "GET", path: "/api/categories/{id}", config: categoriesApi.findOne },
  { method: "POST", path: "/api/categories", config: categoriesApi.create },
  { method: "DELETE", path: "/api/categories/{id}", config: categoriesApi.deleteOne },
  { method: "DELETE", path: "/api/categories", config: categoriesApi.deleteAll },
];
