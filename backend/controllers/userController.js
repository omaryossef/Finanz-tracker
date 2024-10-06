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
          console.log(process.env.JWTSECRET);

          jwt.sign(
            { id: user._id },
            process.env.JWTSECRET,
            {},
            (err, token) => {
              if (err) throw err;
              res
                .cookie("token", token, {
                  maxAge: 90000000,
                  httpOnly: true,
                  sameSite:
                    process.env.NODE_ENV === "production" ? "None" : "Lax",
                  secure: process.env.NODE_ENV === "production",
                })
                .json({ id: user._id });
            }
          );

          console.log("token created");
        }
      }
    } else {
      res.status(500).send("wrong password");
    }
  } catch (error) {
    console.error(error.message);
    res.status(401).json(error.message);
  }
};
export const postSignoutUser = async (req, res) => {
  res.clearCookie("token", {
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    secure: process.env.NODE_ENV === "production",
  });
  res.send("signout user");
};

export const validateUser = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const tokenData = jwt.verify(token, process.env.JWTSECRET);
    const user = await productModel.findById(tokenData.id);
    if (!user) throw new Error("User not found");
    const { _id, username, email, password, prdocutions } = user;
    res.status(200).json({ _id, username, email, password, prdocutions });
    console.log("Token verified");
  } catch (error) {
    console.error(error.message);
    res.status(400).json("Error: Invalid token");
  }
};
