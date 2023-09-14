import { asyncError } from "../middlewares/error.js";
import { User } from "../models/User.js";
import ErrorHandler from "../utils/error.js";
import bcrypt from "bcrypt";
import {
  cookieOption,
  getDataUri,
  sendEmail,
  sendToken,
} from "../utils/featuars.js";
import Cloudinary from "cloudinary";

//! Login
export const Login = asyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new ErrorHandler("Please fill all the fields", 400));

  // console.log(password)

  const user = await User.findOne({ email }).select("+password");

  //! Handle Error

  const isMatched = await user.comparePassword(password, user.password);

  if (!isMatched) {
    return next(new ErrorHandler("invalid email or password", 400));
  }
  sendToken(user, res, "Login Successfully", 200);
});

//! Register New User
export const Register = asyncError(async (req, res, next) => {
  const { name, email, password, address, city, country, pinCode } = req.body;

  if (!name || !email || !password || !address || !city || !country || !pinCode)
    return next(new ErrorHandler("Please fill all the fields", 400));

  //! Check if user already exist
  let user = await User.findOne({ email });

  if (user) return next(new ErrorHandler("user already exist", 400));

  let avatar = undefined;

  if (req.file) {
    const file = getDataUri(req.file);
    const myCloud = await Cloudinary.v2.uploader.upload(
      file.content,
      async (err, result) => {
        if (err) {
          return next(new ErrorHandler("Error in Cloudinary", 400));
        }
        console.log(result);
      }
    );

    avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  //! Add CloudNary Here
  user = await User.create({
    avatar,
    name,
    email,
    password,
    address,
    city,
    country,
    pinCode,
  });

  sendToken(user, res, "User Register Successfully", 201);
});

//! Logout User

export const Logout = asyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      ...cookieOption,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logout Successfully",
    });
});

//! get My Profile
export const myProfile = asyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    user,
  });
});

//! Update User
export const updateProfile = asyncError(async (req, res, next) => {
  const { name, email, address, city, country, pinCode } = req.body;

  const user = await User.findById(req.user._id);

  if (name) user.name = name;
  if (email) user.email = email;
  if (address) user.address = address;
  if (city) user.city = city;
  if (country) user.country = country;
  if (pinCode) user.pinCode = pinCode;

  await user.save();

  res.status(200).json({
    success: true,
    message: "user updated successfully",
  });
});

//!  Change Password
export const changePassword = asyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");

  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword)
    return next(
      new ErrorHandler("Please Enter the oldPassword  & New Password", 400)
    );

  const isMatched = await user.comparePassword(oldPassword);

  if (!isMatched) {
    return next(new ErrorHandler("incorrect old password", 400));
  }

  user.password = newPassword;

  await user.save();

  res.status(200).json({
    success: true,
    message: "password updated successfully",
  });
});

//! Update Picture

export const updatePic = asyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  const file = getDataUri(req.file);

  await Cloudinary.v2.uploader.destroy(user.avatar.public_id);

  const myCloud = await Cloudinary.v2.uploader.upload(
    file.content,
    async (err, result) => {
      if (err) {
        return next(new ErrorHandler("Error in Cloudinary", 400));
      }
      console.log(result);
    }
  );

  user.avatar = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };

  await user.save();

  res.status(200).json({
    success: true,
    message: "Avatar updated successfully",
  });
});

//! Forget Password
export const forgetPassword = asyncError(async (req, res, next) => {
  const { email } = req.body;
  if (!email) return next(new ErrorHandler("Please Enter the email", 400));

  const user = await User.findOne({ email });

  if (!user)
    return next(new ErrorHandler("User not found in this email address", 404));

  const randomNumber = Math.random() * (999999 - 100000) + 100000;

  const otp = Math.floor(randomNumber);

  const otp_expire = 15 * 60 * 1000;

  user.otp = otp;
  user.otp_expiry = new Date(Date.now() + otp_expire);

  await user.save();

  const message = `Your OTP For Reseting  Password is ${otp} . If you have not requested this OTP then please ignore this email`;

  try {
    await sendEmail("OTP for reset password", user.email, message);
  } catch (error) {
    user.otp = null;
    user.otp_expiry = null;

    await user.save();

    return next(error);
  }

  res.status(200).json({
    success: true,
    message: "OTP sent successfully",
  });
});

//! reset password

export const resetPassword = asyncError(async (req, res, next) => {
  const { otp, password } = req.body;
  console.log(otp);
  const user = await User.findOne({
    otp,
    otp_expiry: {
      $gt: Date.now(),
    },
  });

  console.log(user);

  if (!user)
    return next(new ErrorHandler("Invalid OTP or has been expired", 400));
  if (!password)
    return next(new ErrorHandler("Please Enter the new Password", 400));

  user.password = password;
  user.otp = undefined;
  user.otp_expiry = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password reset successfully, you can login now",
  });
});

//! get All User
export const getAllUser = asyncError(async (req, res, next) => {
  const user = await User.find({});

  res.status(200).json({
    success: true,
    user,
  });
});
