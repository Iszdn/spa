import asyncHandler from "express-async-handler";
import Users from "../models/user.js";
import generateToken from "../utils/generateToken.js";

export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email: email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      id: user._id,
      lastname: user.lastname,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users

export const registerUser = asyncHandler(async (req, res) => {
  const { lastname, firstname, username, password, email } = req.body;
  const userExist = await Users.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }
  const user = await Users.create({
    lastname,
    firstname,
    username,
    password,
    email,
  });
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      lastname: user.lastname,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});

// @desc    LOgout user
// @route   POST /api/users/logout

export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: " Logout User" });
});

// @desc    get user profile
// @route   Get /api/users/profile

export const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: " User Profile" });
});

// @desc    Update user profile
// @route   PUT /api/users/profile

export const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: " User Profile Updated" });
});
