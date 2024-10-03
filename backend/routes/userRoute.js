import { Router } from "express";
import {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
} from "../controllers/productController.js";
import {
  postUserLogin,
  postUserRegister,
} from "../controllers/userController.js";

const productRouter = Router();

productRouter
  .get("/allproduct/:id", getAllProduct)
  .post("/addproduct/:id", addProduct)
  .patch("/:id", updateProduct)
  .delete("/:id", deleteProduct)
  .post("/signup", postUserRegister)
  .post("/login", postUserLogin);

export default productRouter;
