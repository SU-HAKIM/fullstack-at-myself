const Flash = require('../utils/capitalFlash');
const Profile = require('../models/profile');

exports.dashboardController = async (req, res, next) => {
    try {
        const profile = await Profile.findOne({ user: req.user._id });
        if (profile) {
            res.render('pages/dashboard/dashboard', {
                title: 'My Dashboard',
                flashMessage: Flash.getMessage(req)
            })
        }
        res.redirect('dashboard/create-profile')
    } catch (error) {
        next(e);
    }
}

exports.createProfileGetController = async (req, res, next) => {
    const profile = await Profile.findOne({ user: req.user._id });
    if (profile) {
        return res.redirect('/dashboard/edit-profile')
    }

    res.render('pages/dashboard/create-profile', {
        title: 'Create Your Profile',
        flashMessage: Flash.getMessage(req)
    })
}

exports.createProfilePostController = (req, res, next) => {

}

exports.editProfileGetController = (req, res, next) => {

}

exports.editProfilePostController = (req, res, next) => {

}