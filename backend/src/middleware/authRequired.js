import jwt from "jsonwebtoken";

// Middleware authRequired checks user authentication
export function authRequired(req, res, next) {
  // Extract request header authorization
  const authHeader = req.headers.authorization;
  // If auth header missing return 401
  if (!authHeader) return res.status(401).json({ error: "Missing token" });

  // Extract token from "Bearer <token>" string
  const token = authHeader.split(" ")[1];

  try {
    // Verify and decode JWT token using secret key
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // Extract userId from decoded payload and attach to request
    req.userId = payload.userId;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
}
