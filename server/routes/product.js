import express from "express";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";
import { singleUpload } from "../middlewares/multer.js";
import {
    addNewCategory,
    addProductImages,
  createNewProduct,
  deleteCategory,
  deleteProduct,
  deleteProductImages,
  getAdminProduct,
  getAllCategory,
  getAllProduct,
  getProducts,
  getProductDetails,
  updateProduct,
} from "../controllers/product.js";

const router = express.Router();

router.get("/getproduct", getProducts);
router.get("/all", getAllProduct);
router.get("/admin",isAuthenticated,isAdmin, getAdminProduct);

router
  .route("/single/:id")
  .get(getProductDetails)
  .put(isAuthenticated,isAdmin, updateProduct).delete(isAuthenticated,isAdmin ,deleteProduct);

router.post("/new", isAuthenticated,isAdmin, singleUpload, createNewProduct);

router.route("/images/:id").post(isAuthenticated,isAdmin,singleUpload,addProductImages).delete(isAuthenticated,isAdmin,deleteProductImages)

router.post("/category/new",isAuthenticated,isAdmin,addNewCategory)
router.get("/categories",getAllCategory)
router.delete("/category/:id",isAuthenticated,isAdmin,deleteCategory)

export default router;
