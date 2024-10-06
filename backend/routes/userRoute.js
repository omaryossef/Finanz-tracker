import { Router } from "express";
import {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
} from "../controllers/productController.js";
import {
  postSignoutUser,
  postUserLogin,
  postUserRegister,
  validateUser,
} from "../controllers/userController.js";

const productRouter = Router();

productRouter
  .get("/allproduct/:id", getAllProduct)
  .post("/addproduct/:id", addProduct)

  .patch("/updateProduct/:id/:productId", updateProduct)
  .delete("/deleteProduct/:id/:productId", deleteProduct)
  .post("/signup", postUserRegister)
  .post("/login", postUserLogin)
  .post("/signout", postSignoutUser)
  .post("/validate", validateUser);

export default productRouter;
