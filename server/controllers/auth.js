
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/auth.js'; 
import dotenv from 'dotenv'
dotenv.config()

export const signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      role, 
    });

    const token = jwt.sign(
      { email: newUser.email, id: newUser._id, role: newUser.role },
      process.env.JWT,
      { expiresIn: '1h' }
    );

    res.status(201).json({ result: newUser, token });
  } catch (error) {
    console.error('Signup Error:', error); 
    res.status(500).json({ message: 'Something went wrong...' });
  }
};




export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id, role: existingUser.role },
      process.env.JWT, 
      { expiresIn: '1h' }
    );

    res.status(200).json({ result: existingUser, token });
    console.log("success")
  } catch (error) {
    console.error('Login Error:', error); 
    res.status(500).json({ message: 'Something went wrong...' });
  }
};
export const getEnrolledCourses = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('coursesPurchased'); 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

   
    res.status(200).json(user.coursesPurchased);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};






