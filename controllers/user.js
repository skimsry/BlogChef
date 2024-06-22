// import User from '../models/user.js';

// export const signUpAdmin = async ({ name, email, password }) => {
//   try {
//     await User.create({ name, email, password, isAdmin: true });
//     return Promise.resolve();
//   } catch (error) {
//     return Promise.reject({ error });
//   }
// };

import User from "../models/user.js";
import jwt from "jsonwebtoken";

const sign = (obj) => {
  return new Promise((resolve, reject) => {
    jwt.sign(obj, process.env.jwtPrivateKey, (error, token) => {
      if (error) return reject(error);
      return resolve(token);
    });
  });
};

const verify = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.jwtPrivateKey, (error) => {
      if (error) return reject(error);
      return resolve();
    });
  });

export const signUpAdmin = async ({ name, email, password }) => {
  try {
    await User.create({ name, email, password, isAdmin: true });
    return Promise.resolve();
  } catch (error) {
    return Promise.reject({ error });
  }
};

export const loginAdmin = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email, isAdmin: true });
    await user.checkPassword(password);
    await user.updateLoggedIn();
    return Promise.resolve(user);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const signUpUser = async ({ name, email, password }) => {
  try {
    const user = await User.create({ name, email, password });
    const token = sign({
      id: user._id,
      name: user.name,
      email: user.email,
    });

    return Promise.resolve({
      user: { id: user._id, name: user.name, lastLoggedIn: user.lastLoggedIn },
      token,
    });
  } catch (error) {
    return Promise.reject({ error });
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    await user.checkPassword(password);
    await user.updateLoggedIn();
    const token = await sign({
      id: user._id,
      name: user.name,
      email: user.email,
    });

    return Promise.resolve({
      user: { id: user._id, name: user.name, lastLoggedIn: user.lastLoggedIn },
      token,
    });
  } catch (error) {
    return Promise.reject({ error });
  }
};

export const verifyToken = async (token) => {
  try {
    const user = jwt.decode(token);
    const findUser = await User.findOne({ email: user.email });
    console.log(findUser);
    if (!findUser) return Promise.reject({ error: "Unauthorized" });
    await verify(token);
  } catch (error) {
    return Promise.reject({ error: "Unauthorized" });
  }
};

export const verifyUser = (email) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ email });
      return resolve(user ? true : false);
    } catch {
      return reject(false);
    }
  });

export async function deleteUser(userId) {
  try {
    const user = await User.findById(userId);
    if (user) {
      // await user.deleteOne();
      await user.deleteOne();
      console.log("User deleted successfully");
    } else {
      console.log("User not found");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}
