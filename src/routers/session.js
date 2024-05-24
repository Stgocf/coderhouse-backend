import { Router } from "express";
import { counter, login, logout, auth , privado, register} from "../controllers/session.js";
import passport from "passport";

const sessionRouter = Router();

//sessionRouter.get('/', counter)
sessionRouter.get('/error', (req, res) => {
    res.status(401).json({ msg: 'Error!!' });
});

//sessionRouter.post('/login', login);
sessionRouter.post('/login', passport.authenticate('login'), (req, res) => {
        //if passport auth is OK, create a session
        console.log('login passport OK, creating session...');
        let user = {...req.user._doc};
        console.log('user:', user);
        delete user.password;
        req.session.user = user;
        res.status(200).json({ msg: 'Logged in' });
    }
);


sessionRouter.post('/logout', logout);
//sessionRouter.get('/privado', auth, privado )s

//sessionRouter.post('/register', register)
sessionRouter.post('/register', passport.authenticate('register'), (req, res) => {
        res.status(200).json({ msg: 'User created' });
    }
);

//session router for githib
sessionRouter.get('/github', passport.authenticate('github'), (req, res) => {
        // The request will be redirected to GitHub for authentication, so this
        // function will not be called.
        console.log('redirecting to github...');
    }
);

sessionRouter.get('/github/callback', passport.authenticate('github', { failureRedirect: '/api/sessions/error', 
                                                                        successRedirect: '/profile'}),
    (req, res) => {
        res.status(200).json({ payload: req.user});
    }
);

export default sessionRouter;

