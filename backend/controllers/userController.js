import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import productModel from "../model/productModel.js";

export const postUserRegister = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await productModel.create({
      username,
      email: email.toLowerCase(),
      password: bcrypt.hashSync(password, 10),
    });
    res.status(201).json(user);
    console.log("registration successful");
  } catch (error) {
    res.status(500).send(error);
  }
};

//login method
export const postUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email && password) {
      res.status(400).send("Please Enter a valid Email");
    } else if (email && !password) {
      res.status(400).send("please enter a  password");
    } else if (email && password) {
      const user = await productModel.findOne({ email });
      if (user) {
        console.log("user found");
        const hashedPwt = bcrypt.compare(password, user.password);
        if (hashedPwt) {
          console.log("password correct");
          res.status(200).json(user);
        }
      }
    } else {
      res.status(500).send("wrong password");
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
