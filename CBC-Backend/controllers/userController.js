import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  try {
    const { email, firstname, lastname, password } = req.body;
    if (!email || !firstname || !lastname || !password)
      return res.status(400).json({ message: "All the field s are required" });

    const duplicate = await User.findOne({ email });
    if (duplicate)
      return res.status(400).json({ message: "email already exists" });

    const hashPassword = bcrypt.hashSync(password, 10);
    const newUser = {
      email,
      firstname,
      lastname,
      password: hashPassword,
    };
    const result = await User.create(newUser);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
  }
};

export const userLogIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "email and password are required" });
  const checkUser = await User.findOne({ email });
  if (!checkUser) return res.status(400).json({ message: "user not found" });

  const isPasswordEqual = bcrypt.compareSync(password, checkUser.password);
  if (!isPasswordEqual)
    return res.status(400).json({ message: "password is incorrect" });

  //generate token
  const token = jwt.sign(
    {
      email: checkUser.email,
      firstname: checkUser.firstname,
      lastname: checkUser.lastname,
      isBlocked: checkUser.isBlocked,
      userType: checkUser.userType,
      profilePicLink: checkUser.profilePicLink,
    },
    "CBC-Backend"
  );
  console.log(token);
  res.json({
    message: " user logged in",
    token: token,
  });
};
