import { Router } from "express";
import { getCookie, setCookie, deleteCookie, getSignedCookie, setSignedCookie} from "../controllers/cookie.js";

const cookieRouter = Router();

cookieRouter.get('/getCookie', getCookie);
cookieRouter.get('/setCookie', setCookie);
cookieRouter.get('/deleteCookie', deleteCookie) ;

cookieRouter.get('/getSignedCookie', getSignedCookie);
cookieRouter.get('/setSignedCookie', setSignedCookie);

export default cookieRouter;