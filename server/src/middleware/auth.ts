import { Request, Response, NextFunction } from "express";
import { ADMIN_KEY } from "../config/process";

// Ensure ADMIN_KEY is set to prevent server running with a vulnerability
if (!ADMIN_KEY) {
  console.error("ADMIN_KEY is not defined. Please set the ADMIN_KEY environment variable.");
  process.exit(1);
}

export async function adminAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.headers["x-admin-key"] === ADMIN_KEY) {
    return next();
  }

  // Log for unauthorized access attempts, but avoid logging the key itself
  console.warn("Unauthorized access attempt with incorrect admin key.");

  return res.status(401).json({
    status: "error",
    message: "Unauthorized",
  });
}