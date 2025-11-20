import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  console.log(req.headers);
  if (!req.headers['authorization']) {
    return res.status(401).json({ message: "No token provided" });
  }
  
  const token = req.headers['authorization'].split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(decoded);
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
