import { Router } from "express";
import { counter, login, logout, auth , privado, register} from "../controllers/session.js";

const sessionRouter = Router();

//sessionRouter.get('/', counter)
sessionRouter.post('/login', login);
sessionRouter.post('/logout', logout);
//sessionRouter.get('/privado', auth, privado )
sessionRouter.post('/register', register)

export default sessionRouter;