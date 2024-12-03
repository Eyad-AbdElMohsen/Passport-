import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { GoogleUser, User } from '../models/user.model'; 
import ApiError from '../errors/api.error'; 
import passport, { Profile } from 'passport';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_CALLBACK_URL) {
    throw new ApiError('Internal server error', 500);
}

passport.use(
    new GoogleStrategy({
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: GOOGLE_CALLBACK_URL, 
        },
        async (accessToken: string, refreshToken: string, profile: Profile, done) => {
            try {
                let user = await User.findOne({ email: profile.emails![0].value, googleId: profile.id });
                if (!user) {
                    user = await User.create({
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails![0].value
                    });
                }
                return done(null, user); 
            } catch (error) {
                return done(error, false);
            }
        }
    )
);

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

export default passport