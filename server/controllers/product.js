import { asyncError } from "../middlewares/error.js";
import { Product } from "../models/Product.js";
import ErrorHandler from "../utils/error.js";
import Cloudinary from "cloudinary";
import { getDataUri } from "../utils/featuars.js";
import { Category } from "../models/Category.js";

//! get All Product query
export const getAllProduct = asyncError(async (req, res, next) => {
  const { keyword, category } = req.query;

  const products = await Product.find({
    name: {
      $regex: keyword ? keyword : "",
      $options: "i",
    },
    category: category ? category : undefined,
  });

  res.status(200).json({
    success: true,
    products,
  });
});
export const getProducts = asyncError(async (req, res, next) => {

  const products = await Product.find({});

  res.status(200).json({
    success: true,
    products,
  });
});

//! get Admin Products
export const getAdminProduct = asyncError(async (req, res, next) => {
  const products = await Product.find({}).populate("category");

  const outOfStock = products.filter((item) => item.stock === 0);

  res.status(200).json({
    success: true,
    products,
    outOfStock : outOfStock.length,
    inStock: products.length - outOfStock.length,
  });
});

//! Get Product Detailed

export const getProductDetails = asyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate("category");

  if (!product) return next(new ErrorHandler("Product Not Found", 404));

  res.status(200).json({
    success: true,
    product,
  });
});

//! Create New Product

export const createNewProduct = asyncError(async (req, res, next) => {
  const { name, description, category, price, stock } = req.body;

  if (!req.file) return next(new ErrorHandler("Please Add Image", 400));

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

  const image = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };

  await Product.create({
    name,
    description,
    category,
    price,
    stock,
    images: [image],
  });

  res.status(200).json({
    success: true,
    message: "Product Created successfully!",
  });
});

//! Update Product

export const updateProduct = asyncError(async (req, res, next) => {
  const { name, description, price, stock, category } = req.body;
  const product = await Product.findById(req.params.id);

  if (!product) return next(new ErrorHandler("Product Not Found", 404));

  if (name) product.name = name;
  if (description) product.description = description;
  if (category) product.category = category;
  if (price) product.price = price;
  if (stock) product.stock = stock;

  await product.save();

  res.status(200).json({
    success: true,
    message: "Product Updated successfully!",
  });
});

//! Add Images

export const addProductImages = asyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) return next(new ErrorHandler("Product Not Found", 404));

  if (!req.file) return next(new ErrorHandler("Please Add Image", 400));

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

  const image = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };

  product.images.push(image);

  await product.save();

  res.status(200).json({
    success: true,
    message: "Image Added successfully!",
  });
});

//!Delete Images

export const deleteProductImages = asyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) return next(new ErrorHandler("Product Not Found", 404));

  const id = req.query.id;

  if (!id) return next(new ErrorHandler("Please Provide Image Id", 400));

  let isExist = -1;

  product.images.forEach((item, index) => {
    if (item._id.toString() === id.toString()) isExist = index;
  });

  console.log(isExist);

  if (isExist < 0) return new ErrorHandler("Image Not Found", 400);

  await Cloudinary.v2.uploader.destroy(product.images[isExist].public_id);

  product.images.splice(isExist, 1);

  await product.save();

  console.log(product.images);

  res.status(200).json({
    success: true,
    message: "Image deleted successfully!",
  });
});

//!  Delete Product

export const deleteProduct = asyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) return next(new ErrorHandler("Product Not Found", 404));

  for (let index = 0; index < product.images.length; index++) {
    await Cloudinary.v2.uploader.destroy(product.images[index].public_id);
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "product deleted successfully!",
  });
});

//! add New Category

export const addNewCategory = asyncError(async (req, res, next) => {
  const { category } = req.body;

  if (!category)
    return next(
      new ErrorHandler("category are required, please enter category", 400)
    );

  await Category.create({
    category,
  });

  res.status(201).json({
    success: true,
    message: "Category Added successfully!",
  });
});

//! get All Category

export const getAllCategory = asyncError(async (req, res, next) => {
  const categories = await Category.find({});

  res.status(200).json({
    success: true,
    categories,
  });
});

//! delete categories

export const deleteCategory = asyncError(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) return next(new ErrorHandler("Category Not Found", 404));

  const products = await Product.find({ category: category._id });

  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    product.category = undefined;

    await product.save();
  }

  await category.deleteOne();

  res.status(200).json({
    success: true,
    message: "Category deleted successfully!",
  });
});
