const authRoute = require('./authRouter');
const dashboardRoute = require('./dashboardRoute');

const routes = [
    {
        path: '/auth',
        handler: authRoute
    },
    {
        path: '/dashboard',
        handler: dashboardRoute
    },
    {
        path: "/",
        handler: (req, res) => {
            res.redirect('/auth/login')
        }
    }
]

module.exports = app => {
    routes.forEach(r => {
        if (r.path === '/') {
            app.get(r.path, r.handler)
        } else {
            app.use(r.path, r.handler)
        }
    })
}