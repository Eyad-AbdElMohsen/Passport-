import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 200,
    message: 'Too many requests, please try again later.',
});


export default limiter