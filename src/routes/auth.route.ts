import { Router } from "express";
import { Request, Response } from "express";
import passport from "../config/passport";
import ApiError from "../errors/api.error";
import { generateJWT } from "../utils/generateToken";
import { verifyToken } from "../middlewares/verifyToken";
import { CustomRequest } from "../utils/customRequest";

const authRouter = Router()



//google
authRouter.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));


authRouter.get("/api/sessions/oauth/google", passport.authenticate("google", {
}), (req: Request, res: Response)=> {
        if(!req.user) throw new ApiError('logged in with google failed', 500)
        // generate token 
        const token = generateJWT({
            email: req.user.email,
            name: req.user.name,
            googleId: req.user.googleId,
            githubId: req.user.githubId
        })
        res.cookie('x-auth-cookie', token, {
            maxAge: 5 * 60 * 60 *1000,
            httpOnly: true
        })
        if(!process.env.CLIENT_URL)
            throw new Error('no CLIENT_URL')
        res.redirect(process.env.CLIENT_URL)
    }
);

//github
authRouter.get("/auth/github", passport.authenticate("github", { scope: ["user:email"] }));

authRouter.get("/auth/github/callback", passport.authenticate("github", {
    failureRedirect: "/login",
    }), (req: Request, res: Response)=> {
        if(!req.user) throw new ApiError('logged in with google failed', 500)
            // generate token 
            const token = generateJWT({
                email: req.user.email,
                name: req.user.name,
                googleId: req.user.googleId,
                githubId: req.user.githubId
            })
            res.cookie('x-auth-cookie', token, {
                maxAge: 5 * 60 * 60 *1000,
                httpOnly: true
            })
            if(!process.env.CLIENT_URL)
                throw new Error('no CLIENT_URL')
            res.redirect(process.env.CLIENT_URL)
    }
);

//logout
authRouter.get("/logout", (req: Request, res: Response) => {
    res.cookie('x-auth-cookie', '', {
        expires: new Date(0)
    })
    res.end()
});

// example of protect routes
authRouter.get("/dashboard", verifyToken, (req: CustomRequest, res: Response) => {
    res.json({ message: "Welcome to your dashboard!", user: req.currentUser });
});


export default authRouter