import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.CLAVE_SECRETA || "clave_secreta";

// Middleware para validar JWT
export const validateJWT = (req: Request, res: Response, next: NextFunction): void => {
  const tokenHeader = req.headers["authorization"]?.split(" ")[1];
  const tokenCookie = req.cookies.token;

  const token: string = tokenCookie || tokenHeader;

  if (!token) {
    res.status(403).json({ message: "Token no proporcionado" });
    return;
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err || !decoded) {
      res.status(401).json({ message: "Token inválido" });
      return;
    }

    req.user = decoded as Express.Request["user"];
    next();
  });
};
