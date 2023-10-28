import User from "../models/user.js";
import Jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).send({
      success: false,
      message: "Login first",
    });
  }

  const derivedData = Jwt.verify(token, process.env.JWT_SECRET);

  const userId = derivedData._id;
  res.user = await User.findById(userId);
  next();
};
