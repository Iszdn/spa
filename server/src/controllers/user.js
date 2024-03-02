import asyncHandler from "express-async-handler";
import Users from "../models/user.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from 'bcryptjs';
import sendMail from "../utils/email.js";


export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email: email });
  if (user) {
    if (user.isVerified) {
      if (await user.matchPassword(password)) {
        generateToken(
          req,
          res,
          user._id,
          user.email,
          user.username,
          user.role,
          user.booking
        );

        res.status(201).json({
          id: user._id,
          username: user.username,
          email: user.email,
          token: req.token,
        });
        console.log(req.token);
      } else {
        res.status(401).json("Invalid email or password");
      }
    } else {
      res.status(401).json("Email not verified. Please verify your email.");
    }
  } else {
    res.status(401).json("Invalid email or password");
  }
});


// @desc    Register a new user
// @route   POST /api/users
export const registerUser = asyncHandler(async (req, res) => {
  const { username, password, email, role } = req.body;
  const userExist = await Users.findOne({ email });
  if (userExist) {
    return res.status(400).json({ error: "User already exists" });
  }

  const newUser = await Users.create({
    username,
    password,
    email,
    role,
  });

  try {
    newUser.emailVerification();
    await newUser.save();

    const emailText = `Please click the following link to verify your email: 
      ${process.env.CLIENT_URL}/Verified?token=${newUser.emailVerificationToken}`;
  
    await sendMail(newUser.email, 'Please verify your email', emailText);
    return res.status(200).json({ message: "Please verify your email" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to register user" });
  }
});

export const verifyEmail = asyncHandler(async (req, res) => {
  try {
    const { token } = req.query;
    console.log("yoxlama",token); 
    const user = await Users.findOne({ emailVerificationToken: token });
    if (!user) {
      return res.status(400).json({ message: 'Invalid token.' });
    }

    if (user.isVerified ) {
      return res.status(400).json({message : "emial verifyeo"})
    }

    user.isVerified = true;
    user.emailVerificationToken = undefined;
    await user.save();

    generateToken(req, res, user._id, user.email, user.username, user.role);
    return res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: req.token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
  const user = {
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
  };
  res.status(200).json({ message: " User Profile" });
});

// @desc    Update user profile
// @route   PUT /api/users/profile

export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.user._id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
    });
  } else {
    res.status(404).json("User not found");
  }
  res.status(200).json({ message: " User Profile Updated" });
});

// @desc    get users
// @route   PUT /api/allusers/

export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find({}).populate("booking");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findById(id)
    .populate({
      path: "booking",
      populate: { path: "spaService" }, // Populate nested field within field1
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findByIdAndDelete(id);
    res.status(200).json("deleted");
  } catch (error) {
    res.status(500).json({ message: error });
  }
};


export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    // Хешируем новый пароль, если он был отправлен
    if ('password' in req.body) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashedPassword;
    }
    const user = await Users.findByIdAndUpdate(id, req.body);
    res.status(200).json("updated");
  } catch (error) {
    res.status(500).json({ message: error });
  }
};





export const resetPassword = async (req, res) => {
  const { email, password } = req.body
  try {
      const user = await Users.findOne({ email: email })
      if (!user) {
          return res.status(404).send("User not found")
      }
      const newHashedPassword = await bcrypt.hash(password, 10);
      user.password = newHashedPassword;
      await user.save();
      res.status(200).send("User password updated");
  } catch (error) {
      res.status(500).send(error.message);
  }
}
