
import jwt from "jsonwebtoken"
import { errorHandler } from "./error.js";
export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Bearer token

  if (!token) {
    console.log("no token")
    return next(errorHandler(401, 'Unauthorized'))
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
        return next(errorHandler(401, 'Unauthorized'))
    }
    req.userId = decoded.userId; // Attach user ID to the request
    next();
  });
};


