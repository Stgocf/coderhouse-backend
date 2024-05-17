import { Router } from "express";
import { counter, login, logout, auth , privado, register} from "../controllers/session.js";

const sessionRouter = Router();

sessionRouter.get('/', counter)
sessionRouter.get('/login', login);
sessionRouter.get('/logout', logout);
sessionRouter.get('/privado', auth, privado )
sessionRouter.post('/register', register)

export default sessionRouter;