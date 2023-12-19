const User = require("../models/User");
const bcrypt = require('bcrypt');

const loadLogin = async (req, res) => {
  try {
    res.render('login');
  } catch (error) {
    console.log(error.message);
  }
}

const verifyLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.render('login', { message: "Email and password are required" });
    }

    const userData = await User.findOne({ email });

    if (!userData) {
      return res.render('login', { message: "Email and password are incorrect" });
    }


    if (!passwordMatch) {
      return res.render('login', { message: "Email and password are incorrect" });
    }
 
    if (userData.is_admin !== 0) {
      return res.render('login', { message: "Email and password are incorrect" });
    }

    req.session.user_id = userData._id;
    res.redirect("/admin/home");
  } catch (error) {
    console.log(error.message);
  }
};

const loadDashboard = async (req, res) => {
  try {
    res.render('home');
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  loadLogin,
  verifyLogin,
  loadDashboard
};