import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  console.log('=== verifyToken middleware ===');
  console.log('Headers:', req.headers);
  console.log('Authorization header:', req.headers['authorization']);
  
  if (!req.headers['authorization']) {
    console.log('❌ No authorization header found');
    return res.status(401).json({ message: "No token provided" });
  }
  
  const token = req.headers['authorization'].split(' ')[1];
  console.log('Extracted token:', token);

  if (!token) {
    console.log('❌ Token is empty after split');
    return res.status(401).json({ message: "No token provided" });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log('✅ Token decoded successfully:', decoded);
    next();
  } catch (err) {
    console.log('❌ Token verification failed:', err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};
