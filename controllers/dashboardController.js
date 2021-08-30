const Flash = require('../utils/capitalFlash');

exports.dashboardController = (req, res, next) => {
    res.render('pages/dashboard/dashboard', {
        title: 'My Dashboard',
        isLoggedIn: req.session.isLoggedIn,
        flashMessage: Flash.getMessage(req)
    })
}