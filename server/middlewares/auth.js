import { User} from "../models/User.js";
import ErrorHandler from "../utils/error.js";
import * as jwt from "jsonwebtoken";
import { asyncError } from "./error.js";

export const isAuthenticated = asyncError(async (req, res, next) => {
  // const token = req.cookies.token

  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("You are not logged in", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decodedData._id);
  // console.log(user);
  req.user = user;

  next();
});

export const isAdmin = asyncError(async (req, res, next) => {


  if (req.user.role !== "admin") {
    return next(new ErrorHandler("Only admin can access this", 401));
  }



  next();
});


