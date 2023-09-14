import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please Enter your name"],
  },
  email: {
    type: String,
    required: [true, "please Enter your email address"],
    unique: [true, "Email already exists"],
    validate: validator.isEmail,
  },
  password: {
    type: String,
    required: [true, "please Enter Password"],
    minLength: [6, "password must be at least 6 characters"],
    select: false,
  },
  address: {
    type: String,
    required: [true, "please Enter your Address"],
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  pinCode: {
    type: Number,
    required: [true, "please Enter your Address"],
  },

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },

  avatar: {
    public_id: String,
    url: String,
  },

  otp: Number,
  otp_expiry: Date,
});

schema.pre("save", async function (next) {
  if(!this.isModified("password")) return next()
  this.password = await bcrypt.hash(this.password, 10);
});

schema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


schema.methods.generateToken = async function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
};

export const User = new mongoose.model("User", schema);
