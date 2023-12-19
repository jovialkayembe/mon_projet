const User = require('../models/User');
const jwt = require('jsonwebtoken')

//handle errors 

const handleErros = (err) => {

    console.log(err.message, err.code);
    let errors = { email: '', password: ''};

    // incorret email 

    if (err.message === 'incorrect email') {
        errors.email = 'that email is not registered';
    }

    if (err.message === 'incorrect password') {
        errors.password = 'that password in incorrect';
    }


    // duplicay=tion de code

    if (err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
    }

    //validator errors

    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            if (properties && properties.path) {
                errors[properties.path] = properties.message;
            }
        });
    }

    return errors;
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'net ninja secret', { 
        expiresIn: maxAge
    });
}

module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.signup_post = async (req, res) => {

    const { name, email, numero, password } = req.body;

    try {

        const imagePath = req.file ? req.file.filename : ''; // Extract the image path or set an empty string if req.file is undefined
        const user = await User.create({ name, email, numero, image: imagePath, password , is_admin:0 });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });

    }

    catch (err) {
        const errors = handleErros(err);
        res.status(400).json({ errors });
    }
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    try {

        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id })

    } catch (err) {

        const errors = handleErros(err);
        res.status(400).json({ errors });
    }
}

module.exports.logout_get =  (req, res) =>{
    res.cookie('jwt',  '', { maxAge: 1});
    res.redirect('/');
}
