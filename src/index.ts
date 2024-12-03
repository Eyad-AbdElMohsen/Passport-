import dotenv from "dotenv";
dotenv.config()
import express , {Express}from "express" 
import errorMiddleware from "./middlewares/error.middleware";
import notFoundMiddleware from "./middlewares/notFound.middleware";
import limiter from "./utils/rateLimit";
import authRouter from "./routes/auth.route";
import session from 'express-session';
import ApiError from "./errors/api.error";
import passport from "./config/passport";
import cookieParser from 'cookie-parser'


const port = process.env.port || 8000

const app : Express = express();

app.use(express.json())
app.use(limiter)
if(!process.env.SESSION_SECRET) throw new ApiError('Inernal server error', 500)
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(cookieParser())

app.use(passport.initialize());
app.use(passport.session())


app.use(authRouter)



// glopal middleware
app.all('*', notFoundMiddleware)
//err handler
app.use(errorMiddleware)

app.listen(port , () => {
    console.log("running on port: " + port);
})