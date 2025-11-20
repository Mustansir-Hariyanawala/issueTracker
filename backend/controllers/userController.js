import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (req, res, next) => {
  console.log(req.body);
  try {
    const { name, email, password, role } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      console.log(user);
      return res.status(422).json({ message: "User Already exists" });
    } else {
      // Password will be hashed automatically by pre-save hook
      const newuser = new User({ name, email, password, role });
      await newuser.save();
      
      // Generate token
      const token = jwt.sign(
        { id: newuser._id.toString(), role: newuser.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
      
      // Return token only
      return res.status(201).json({ token });
    }
  } catch (err) {
    console.log(err);
    return res.status(422).json({ message: "Could not register user" });
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: "Invalid credentials" });

  console.log(user);
  
  const token = jwt.sign(
    { id: user._id.toString(), role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  // Return token only
  res.json({ token });
};

export const getUser = async (req, res, next) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user) return res.status(404).json({ message: "User Not Found" });
  return res.json(user);
};
