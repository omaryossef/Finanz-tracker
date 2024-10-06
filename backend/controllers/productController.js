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
      res.status(200).send("aded new product was added successfully ");
    }
  } catch (error) {
    res.send(error, "new product was not added!");
  }
};

export const deleteProduct = async (req, res) => {
  const { id, productId } = req.params;
  console.log(id, productId);

  try {
    // Find the user by their ID
    const user = await productModel.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Find the index of the product to delete

    const indexProduct = user.productions.findIndex(
      (item) => item._id.toString() === productId
    );
    const product = user.productions.find(
      (item) => item._id.toString() === productId
    );
    console.log(product);

    if (indexProduct === -1) {
      return res.status(404).send("Product not found");
    }

    // Remove the product from the array
    user.productions.splice(indexProduct, 1);
    await user.save(); // Save the user document with the updated array

    res.status(200).send("Product was deleted successfully");
    // res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export const updateProduct = async (req, res) => {
  const { id, productId } = req.params;
  const { name, price, category } = req.body;
  try {
    const user = await productModel.findById(id);
    if (!user) {
      return res.status(400).send("user not found");
    }
    const productIndex = user.productions.findIndex(
      (item) => item._id.toString() === productId
    );
    if (productIndex === -1) {
      return res.status(400).send("product not found");
    }
    if (name) user.productions[productIndex].name = name;
    if (price) user.productions[productIndex].price = price;
    if (category) user.productions[productIndex].category = category;
    await user.save();
    res.status(201).json(user.productions);
  } catch (error) {
    res.status(500).json(error);
  }
};
