const Joi = require('joi');

exports.registerValidation = (request) => {
    const schema = Joi.object({
        name: Joi.string().min(5).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required()
    });

    return schema.validate(request);
}

exports.loginValidation = (request) => {
    const schema = Joi.object({
        email: Joi.string().min(5).required().email(),
        password: Joi.string().min(6).required()
    });

    return schema.validate(request);
}