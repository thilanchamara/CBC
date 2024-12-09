import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  try {
    const newUserData = req.body;

    const duplicate = await User.findOne({ email: newUserData.email });
    if (duplicate)
      return res.status(400).json({ message: "email already exists" });

    if (req.body.type === "admin") {
      if (req.user?.type !== "admin") {
        // console.log(req.user.type);
        return res.status(401).json({
          message: "please login as an admin to create admin account",
        });
      }
    }

    const hashPassword = bcrypt.hashSync(newUserData.password, 10);
    newUserData.password = hashPassword;
    const user = new User(newUserData);
    const result = await user.save();

    res.status(200).json({
      message: "new user created",
      user: result,
    });
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
      type: checkUser.type,
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
export const isAdmin = (req) => {
  if (req.user?.type !== "admin") {
    return false;
  }
  return true;
};
export const isCustomer = (req) => {
  if (req.user?.type !== "customer") {
    return false;
  }
  return true;
};

//email: "john.do@example.com,"password":"securepassword123"-customer
//email: "john.doe@example.com,"password":"securepassword123"-admin
