const express = require("express");
const session = require("express-session");
const config = require("../config/config");

const admin_route = express();

admin_route.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true
  }));

const bodyParser = require("body-parser");
const path = require("path");

admin_route.use(bodyParser.json());
admin_route.use(bodyParser.urlencoded({ extended: true }));

admin_route.set('view engine', 'ejs');
admin_route.set('views', path.join(__dirname, '..', 'views', 'admin'));

const adminController = require("../controllers/adminController");

admin_route.get('/', adminController.loadLogin);

admin_route.post('/login', adminController.verifyLogin);

admin_route.get('/dashboard', adminController.loadDashboard);

admin_route.get('*', function (req, res) {
  res.redirect('/admin');
});

module.exports = admin_route;