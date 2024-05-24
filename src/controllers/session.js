import { request, response } from "express";
import { userModel } from "../models/users.js";
//import hash functions from utils 
import { hashPassword, comparePassword } from '../utils.js'

//const userModel = new userModel()

export const counter = (req = request, res = response) => {
    if(req.session.counter){
        req.session.counter++;
        res.send(`you visited this site ${req.session.counter} times`);
    }
    else{
        req.session.counter = 1;
        res.send('Welcome!')
    }
}

export function auth(req, res, next){
    if(req.session?.user === 'stgocf' && req.session?.admin ){
        return next()
    }
    else{
        res.status(401).send('authenticationError')
    }
}

export const login = async (req = request, res = response) => {
    console.log('Login request received');
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: 'Email and password are required' });
        }

        const user = await userModel.findOne({ email}).lean();
        if (user) {
            const passwordMatch = await comparePassword(password, user.password);
            if (!passwordMatch) {
                return res.status(400).json({ msg: 'Invalid password' });
            }
            req.session.user = user;
            console.log(`Session created for user ${req.session.user.first_name} ${req.session.user.last_name}`);
            res.status(200).json({ msg: 'Login OK' });
        } else {
            res.status(400).json({ msg: 'User not found, please register!' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error logging in' });
    }
};

export const logout = async (req = request, res = response) => {
    console.log('Logout request received');
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).send('Failed to log out.');
        }
        res.redirect('/login');
    });
}

export const privado = (req = request, res = response) => {
    res.send('si estas viendo esto es porque eres stgocf y eres admin!')
}

export const register = async (req = request, res = response) => {
    //creates an user using userModel
    try{
        const { first_name, last_name, email, age, password } = req.body;
        console.log('Register request received');

        //check  if an user with the same email has already been created
        const userExists = await userModel.findOne({email});
        if(userExists){
            return res.status(400).send({ msg: 'User already exists'});
        }

        let role = 'user'
        if (email === 'adminCoder@coder.com' && password === 'adminCod3r123'){
            role = 'admin';
        }

        //hash the password
        const hashedPassword = await hashPassword(password);
        const passwordH = hashedPassword;
        
        const user = await userModel.create({
            first_name, 
            last_name, 
            email, 
            age, 
            password:passwordH, 
            role
        });

        res.status(200).send({ msg: 'User created!'});
    }catch (error){
        console.error(error);
        res.status(500).send({ msg: 'Error creating user'});
    }


}
 

