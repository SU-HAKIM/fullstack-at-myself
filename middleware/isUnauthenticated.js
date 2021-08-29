exports.isUnauthenticated = (req, res, next) => {
    if (req.session.isLoggedIn) {
        res.redirect('/dashboard');
    }
    next()
}