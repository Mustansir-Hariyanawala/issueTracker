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
      const hashedPass = await bcrypt.hash(password, 10);
      const newuser = new User({ name, email, password: hashedPass, role });
      await newuser.save();
      
      // Generate token
      const token = jwt.sign(
        { id: newuser._id.toString(), role: newuser.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
      
      // Return token and user data
      return res.status(201).json({
        token,
        user: {
          _id: newuser._id,
          name: newuser.name,
          email: newuser.email,
          role: newuser.role
        }
      });
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

  res.json({
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
};

export const getUser = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: "User Not Found" });
  return res.json(user);
};
