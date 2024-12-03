import { Router } from "express";
import { Request, Response } from "express";
import passport from "../config/googleStrategy";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware";

const authRouter = Router()

authRouter.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));


authRouter.get("/api/sessions/oauth/google", passport.authenticate("google", {
        failureRedirect: "/login",
    }), (req: Request, res: Response)=> {
        res.json({done: 'logged in successfully'})
    }
);

authRouter.get("/logout", (req: Request, res: Response) => {
    req.logout((err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({done: 'logged out successfully'})
    });
});


authRouter.get("/dashboard", isAuthenticated, (req: Request, res: Response) => {
    res.json({ message: "Welcome to your dashboard!", user: req.user });
});

export default authRouter