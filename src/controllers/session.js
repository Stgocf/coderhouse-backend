import { request, response } from "express";
import { userModel } from "../models/users.js";

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

export const login = (req = request, res = response) => {
    // //const { user, pass } = JSON.stringify(req.body);
    // const { user, pass } = req.query;
    // console.log(`login recieved with query ${JSON.stringify(req.query)}`)
    // console.log(`login recieved with user ${user}`)
    // req.session.user = user
    // req.session.admin = true
    // res.send('Login OK')

    //check u UserModel if the user exists, if exists create a session object, if not it need to be redirected to de register page
    const { email, password } = req.body;
    userModel.findOne({email, password})
    .then( user => {
            if(user){
                req.session.first_name = user.first_name
                req.session.last_name = user.last_name
                req.session.email = user.email
                res.status(200).send({msg:'Login OK'})
            }
            else{
                res.status(400).send({msg:'Login Error'})
            }
        })
}

export const logout = (req = request, res = response) => {
    req.session.destroy( err => {
        if(!err) res.send('Logout OK')
        else res.send({status: 'Logout Error', body: err})
    })
}

export const privado = (req = request, res = response) => {
    res.send('si estas viendo esto es porque eres stgocf y eres admin!')
}

export const register = (req = request, res = response) => {
    //creates an user using userModel
    const { first_name, last_name, email, age, password } = req.body;
    const user = new userModel({first_name, last_name, email, age, password});
    user.save()
    .then( user => {
        res.send(user)
    })
    .catch( err => {
        res.status(400).send(err)
    })

}