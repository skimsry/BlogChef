import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  lastLoggedIn: { type: Date, default: Date.now },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});
userSchema.methods.checkPassword = async function (password) {
  try {
    const match = await bcrypt.compare(password, this.password);
    if (match) {
      return Promise.resolve();
    }
    return Promise.reject();
  } catch (error) {
    return Promise.reject(error);
  }
};

userSchema.methods.updateLoggedIn = function () {
  return this.model("User").findOneAndUpdate(
    {
      email: this.email,
    },
    {
      lastLoggedIn: new Date(),
    }
  );
};
//delete account
userSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      console.log(`Preparing to delete user: ${this._id}`);
      next();
    } catch (err) {
      next(err);
    }
  }
);

const User = model("User", userSchema);

export default User;
