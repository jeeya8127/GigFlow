import User from '../models/user.js';
import jwt from 'jsonwebtoken';

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

export const register = async (req, res,next) => {
  try {
    const { name, email, password, role } = req.body;
    const newUser = await User.create({ name, email, password, role });

    const token = signToken(newUser._id);

    res.cookie('jwt', token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 
    });

    res.status(201).json({ status: 'success', user: { id: newUser._id, name, email } });
  } catch (err) {
    next(err);
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

export const login = async (req, res,next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    const token = signToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

    res.status(200).json({ status: 'success', user: { id: user._id, name: user.name } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const logout = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0), 
  });
  res.status(200).json({ status: 'success' });
};