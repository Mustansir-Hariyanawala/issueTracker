import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (req, res, next) => {
  console.log(req.body);
  try {
    const { name, email, password, role } = req.body;
    const user = await User.findOne({ name: name, email: email });
    if (user) {
      console.log(user);
      return res.status(422).json({ message: "User Already exists" });
    } else {
      const hashedPass = await bcrypt.hash(password, 10);
      const newuser = new User({ name, email, password: hashedPass, role });
      await newuser.save();
      return res.status(200).json({ message: "Successfully added user" });
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
    process.env.JWT_SECRET
  );

  res.json({ token });
};

export const getUser = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: "User Not Found" });
  return res.json(user);
};
