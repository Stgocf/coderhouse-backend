export const auth = (req, res, next) => {
    try {
        if (req.session?.user != null || req.session?.user != undefined) {
            console.log('User is logged in and want to access:', req.path);
             if (req.path === '/login' || req.path === '/register') {
                 return res.redirect('/profile');
             }
            next();
        } else {
            console.log('User is not logged in and want to access:', req.path);
            if (req.path === '/login' || req.path === '/register') {
                return next();
            }
            res.redirect('/login');
        }
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.redirect('/login');
    }
};