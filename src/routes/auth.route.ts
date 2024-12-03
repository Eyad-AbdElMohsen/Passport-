import { Router } from "express";
import { Request, Response } from "express";
import passport from "../config/passport";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware";

const authRouter = Router()

//google
authRouter.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));


authRouter.get("/api/sessions/oauth/google", passport.authenticate("google", {
        failureRedirect: "/login",
    }), (req: Request, res: Response)=> {
        res.json({done: 'logged in successfully with google'})
    }
);

//github
authRouter.get("/auth/github", passport.authenticate("github", { scope: ["user:email"] }));

authRouter.get("/auth/github/callback", passport.authenticate("github", {
    failureRedirect: "/login",
    }), (req: Request, res: Response)=> {
        res.json({done: 'logged in successfully with github'})
    }
);

//logout
authRouter.get("/logout", (req: Request, res: Response) => {
    req.logout((err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({done: 'logged out successfully'})
    });
});

// example of protect routes
authRouter.get("/dashboard", isAuthenticated, (req: Request, res: Response) => {
    res.json({ message: "Welcome to your dashboard!", user: req.user });
});


export default authRouter