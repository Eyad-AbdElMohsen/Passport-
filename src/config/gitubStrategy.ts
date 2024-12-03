import { Strategy as GitHubStrategy } from "passport-github2";
import { User } from '../models/user.model'; 
import ApiError from '../errors/api.error'; 
import { Profile } from 'passport';

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL;

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET || !GITHUB_CALLBACK_URL) {
    throw new ApiError('Internal server error: Missing GitHub credentials', 500);
}

const configureGithubStrategy = new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: GITHUB_CALLBACK_URL,
},
    async (accessToken: string, refreshToken: string, profile: Profile, done: (err: any, user?: any) => void) => {
        try {
            let user = await User.findOne({
                $or: [
                    { email: profile.emails?.[0]?.value },
                    { githubId: profile.id }
                ]
            });
            console.log(user)
            if (!user) {
                user = await User.create({
                    githubId: profile.id,
                    name: profile.username,
                    email: profile.emails?.[0]?.value || 'no email',
                });
            }else{
                user.githubId = profile.id
                user.email = profile.emails?.[0]?.value || 'no email'
                await user.save()
            }
            return done(null, user);
        } catch (error) {
            return done(error, null);
        }
    }
)



export default configureGithubStrategy