import { Request, Response, NextFunction } from "express";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated?.()) {
        res.status(401).json({ message: "Unauthorized. Please log in first." });
    }
    next();
};