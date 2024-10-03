import productModel from "../model/productModel.js";

export const getAllProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await productModel.findById(id);
    if (!user) {
      res.status(400).send("user not found");
    } else {
      res.status(200).json(user.productions);
    }
  } catch (error) {
    res.status(500).send("Server error" + error);
  }
};

export const addProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, category } = req.body;
  try {
    const user = await productModel.findById(id);
    if (!user) {
      res.status(400).send("user not found");
    } else {
      user.productions.push({ name, price, category });
      await user.save();
      res.status(200).send("aded new product ");
    }
  } catch (error) {
    res.send(error, "new product was not added!");
  }
};

export const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const deleteProduct = await productModel.findByIdAndDelete(productId);
    res.send("product was deleted" + deleteProduct);
  } catch (error) {
    res.send("there is no such Product!");
  }
};

export const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const newProduct = req.body;
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      newProduct,
      {
        new: true,
      }
    );
    res.status(201).send("order was updated!" + updatedProduct);
  } catch (error) {
    res.status(500).send("server not found");
  }
};
