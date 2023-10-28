import User from "../models/user.js";
import bcrypt from "bcrypt";
import { setCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export async function getAllUsers(req, res) {}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("Invalid email or password", 404));

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched)
      return next(new ErrorHandler("Invalid email or password", 401));

    setCookie(user, res, 201, `Welcome back, ${user.name}`);
  } catch (error) {
    next(error);
  }
}

export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User Already exist !", 409));

    const hashpassword = await bcrypt.hash(password, 16);

    user = await User.create({
      name,
      email,
      password: hashpassword,
    });

    setCookie(user, res, 201, "Registered Successfully");
  } catch (error) {
    next(error);
  }
}

export function getMyProfile(req, res) {
  res.status(200).send({
    success: true,
    user: res.user,
  });
}

export function logout(req, res) {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
    });
}
