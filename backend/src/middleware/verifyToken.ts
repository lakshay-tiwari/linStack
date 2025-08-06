import { Request, Response , NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token; // ✅ Get token from cookies
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    //@ts-ignore
    req.user = decoded; // attaches user info to req
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
