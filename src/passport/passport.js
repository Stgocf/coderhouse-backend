import passport from "passport";
import local from "passport-local";
import github from "passport-github2";
import { userModel } from "../models/users.js";
import { hashPassword, comparePassword } from "../utils.js";



export const passportConfig = () => {
    passport.use("register", new local.Strategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (req, username, password, done) => {
            try {
                if(!username){
                    return done(null, false, { message: 'Email es required!' });
                }

                const user = await userModel.findOne({ email: username });
                if (user) {
                    return done(null, false, { message: 'User already exist' });
                }


                let role = 'user'
                if (username === 'adminCoder@coder.com' && password === 'adminCod3r123'){
                    role = 'admin';
                }

                password = await hashPassword(password);

                //obtain use data from req
                const { first_name, last_name, email, age, password } = req.body;
                //create new user
                const newUser = new userModel({
                    first_name,
                    last_name,
                    email,
                    age,
                    password,
                    role
                });

                return done(null, newUser);
            } catch (error) {
                return done(error);
            }
        }
    ));

    //login passport
    passport.use("login",new local.Strategy( 
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async ( username, password, done) => {
            try {
                const user = await userModel.findOne({ email: username });
                if (!user) {
                    return done(null, false, { message: 'User not found, please register!' });
                }

                const isMatch = await comparePassword(password, user.password);
                if (!isMatch) {
                    return done(null, false, { message: 'Invalid password, try again!' });
                }

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.use("github", new github.Strategy({
        //clientID: process.env.GITHUB_CLIENT_ID,
        clientID: 'Iv23ctNwfj9YmQUWR8zk',
        //clientSecret: process.env.GITHUB_CLIENT_SECRET,
        clientSecret: 'a2c28b939e63cb6f352db4833df9aa639538a179',
        callbackURL: "http://localhost:8080/api/sessions/github/callback"
    },
    async (req, accessToken, refreshToken, profile, done) => {
        try {
            const user = await userModel.findOne({ email: profile.emails[0].value });
            let password = await hashPassword(profile.id);

            if (!user) {
                //hash the password
                

                const newUser = await userModel.create({
                    first_name: profile.displayName,
                    email: profile.emails[0].value,
                    password
                });

                console.log('new user created: ', newUser);
                return done(null, newUser);
            }

            console.log('user found: ', user);
            return done(null, user);
            
        } catch (error) {
            return done(error);
        }
    }
    ));

    passport.serializeUser((user, done) => {
        console.log('serializeUser user:', user);
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        console.log('deserializeUser id:', id);
        try {
            const user = await userModel.findById(id);
            console.log('deserializeUser user:', user);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });

    return passport;

}
