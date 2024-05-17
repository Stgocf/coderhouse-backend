import { request, response } from "express";

 export const getCookie = (req = request, res = response) => {
    const cookiesFound = req.cookies;
    res.send('Found followig cookies: ' + JSON.stringify(cookiesFound));
}

export const setCookie = (req = request, res = response) => {
    //const { name } = req.query;
    res.cookie('CookieName', 'CookieValue', { maxAge: 10000, httpOnly: true });
    res.send('Cookie CookieName set');
}

export const deleteCookie = (req = request, res = response) => {
    res.clearCookie('CookieName');
    res.send('Cookie CookieName deleted');
}

export const getSignedCookie = (req = request, res = response) => {
    const cookiesFound = req.signedCookies;
    res.send('Found followig signed cookies: ' + JSON.stringify(cookiesFound));
}

export const setSignedCookie = (req = request, res = response) => {
    res.cookie('SignedCookieName', 'SignedCookieValue', { maxAge: 10000, httpOnly: true, signed: true });
    res.send('Signed Cookie SignedCookieName set');
}
