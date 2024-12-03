import passport from 'passport';
import { User } from '../models/user.model';
import configureGithubStrategy from './gitubStrategy';
import configureGoogleStrategy from './googleStrategy';

passport.use(configureGoogleStrategy)
passport.use(configureGithubStrategy)

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser(async (id: string, done) => {
    const user = await User.findById(id);
    done(null, user);
});

export default passport;