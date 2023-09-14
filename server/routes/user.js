import express from "express";
import { Login, Logout, Register, changePassword, forgetPassword, getAllUser, myProfile,  resetPassword,  updatePic,  updateProfile } from "../controllers/user.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/login", Login);
router.post("/new",singleUpload, Register);
router.get("/me", isAuthenticated, myProfile);
router.get("/logout", isAuthenticated, Logout);


//Updating Route
router.put("/updateprofile",isAuthenticated,updateProfile)
router.put("/changepassword",isAuthenticated,changePassword)
router.put("/updatepic",isAuthenticated,singleUpload,updatePic);
router.get("/getalluser" ,isAuthenticated,isAdmin,getAllUser)


//! forget password & reset password

router.route("/forgetpassword").post(forgetPassword).put(resetPassword)
export default router;
