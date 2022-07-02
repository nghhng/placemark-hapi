import { db } from "../models/db.js";
import { UserSpec,  UserCredentialsSpec } from "../models/joi-schemas.js";


export const accountsController = {
  index: {
    auth: false,
    handler: function (request, h) {
      return h.view("Main", { title: "Welcome to Placemark" });
    },
  },
  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("Signup", { title: "Sign up" });
    },
  },
  signup: {
    auth: false,
    // validate: {
    //   payload: UserSpec,
    //   options: { abortEarly: false },
    //   failAction: function (request, h, error) {
    //     return h.view("Signup", { title: "Sign up error", errors: error.details }).takeover().code(400);
    //   },
    // },
    handler: async function (request, h) {
      const user = request.payload;
      await db.userStore.addUser(user);
      return h.redirect("/");
    },
  },
  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("Login", { title: "Login" });
    },
  },
  login: {
    auth: false,
    validate: {
      payload: UserCredentialsSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("Login", { title: "Login error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      if (!user || user.password !== password) {
        return h.redirect("/");
      }
      request.cookieAuth.set({ id: user._id });
      return h.redirect("/placemark");
    },
  },
  logout: {
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  async validate(request, session) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { valid: false };
    }
    return { valid: true, credentials: user };
  },
};
