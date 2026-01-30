const jwt = require('jsonwebtoken');
const User = require('../models/user');

async function signup(req, res, next) {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      const err = new Error('All fields are required');
      err.status = 400;
      return next(err);
    }

    if (password !== confirmPassword) {
      const err = new Error('Passwords do not match');
      err.status = 400;
      return next(err);
    }

    if (password.length < 6) {
      const err = new Error('Password must be at least 6 characters');
      err.status = 400;
      return next(err);
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      const err = new Error('User with this email or username already exists');
      err.status = 409;
      return next(err);
    }

    const newUser = new User({
      username,
      email,
      password,
      role: 'user'
    });

    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const err = new Error('Email and password are required');
      err.status = 400;
      return next(err);
    }

    const user = await User.findOne({ email });

    if (!user) {
      const err = new Error('User not found');
      err.status = 404;
      return next(err);
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      const err = new Error('Invalid password');
      err.status = 401;
      return next(err);
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    next(err);
  }
}

async function getMe(req, res, next) {
  try {
    const user = await User.findById(req.userId);
    res.json(user);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  signup,
  login,
  getMe
};
