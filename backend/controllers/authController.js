import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { validateSignupRequest } from '../validations/validateSignupRequest.js';
import { validateLoginRequest } from '../validations/validateLoginRequest.js';

export const register = async (req, res) => {
  try {
    const { username, email, password } = await validateSignupRequest.validate(req.body, {
      abortEarly: false,
    });

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(409).json({ error: 'User with this username or email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });

    return res.status(201).json({
      message: 'Signup successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.errors });
    }
    return res.status(500).json({ error: error.message || 'Signup failed' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30m' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 60 * 1000,
    });
    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Login failed' });
  }
};

export const logout = (req, res) => {
  res.clearCookie('token');
  return res.status(200).json({ message: 'Logged out successfully' });
};

export const getMe = async (req, res) => {
  return res.status(200).json({
    user: req.user,
  });
};

export const updateHeartbeat = async (req, res) => {
  try {
    const secondsToAdd = Number(req.body.seconds) || 10;

    if (req.user?.role === 'admin' || req.user?.email === process.env.admin_id) {
      return res.status(200).json({ success: true, message: 'Admin time ignored' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $inc: { loggedInTime: secondsToAdd } },
      { new: true }
    ).select('username loggedInTime');

    return res.status(200).json({
      success: true,
      message: 'Heartbeat recorded',
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Heartbeat update failed' });
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const adminEmail = process.env.admin_id || 'ankitdhiman@gmail.com';
    const leaderboard = await User.find({
      role: { $ne: 'admin' },
      email: { $ne: adminEmail }
    })
      .select('username loggedInTime createdAt')
      .sort({ loggedInTime: -1 })
      .limit(10);

    return res.status(200).json({
      success: true,
      leaderboard,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Failed to fetch leaderboard' });
  }
};


