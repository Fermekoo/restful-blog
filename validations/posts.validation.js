const Joi = require('joi');

exports.createValidation = (request) => {
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        description: Joi.string().required(),
        categoryId: Joi.string().required()
    });

    return schema.validate(request);
}