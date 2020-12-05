
const User              = require('../../models/User');
const bcrypt            = require('bcryptjs');
const jwt               = require('jsonwebtoken');
const userValidation    = require('../../validations/user.validation');

exports.register = async (req, res) => {

    const {error} = userValidation.registerValidation(req.body);

    if(error) return res.status(400).json({message: error.details[0].message});

    const emailExist = await User.findOne({email: req.body.email});

    if(emailExist) return res.status(400).json({message: 'email already exists'});

    //hash password 
    const salt = await bcrypt.genSalt(10);
    const hasPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hasPassword
    });

    try {
        
         await user.save();

        res.json({message: 'user created', userId: user._id});

    } catch (error) {
        res.status(500).json({message: error})
    }
}

exports.login = async (req, res) => {

    const {error} = userValidation.loginValidation(req.body);
    if(error) return res.status(400).json({message: error.details[0].message});

    const user = await User.findOne({email: req.body.email});

    if(!user) return res.status(400).json({message: "email or password is wrong"});

    const validPass = await bcrypt.compare(req.body.password, user.password);

    if(!validPass) return res.status(400).json({message: "email or password is wrong"});

    const token = jwt.sign({_id: user._id, email: user.email}, process.env.JWT_SECRET);
    
    res.header('auth-token', token).json({message: 'login success', accessToken: token});
}