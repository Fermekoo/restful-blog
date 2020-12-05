const Joi = require('joi');

exports.categoryValidation = (request) => {
    const schema = Joi.object({
        categoryName: Joi.string().min(3).required()
    });

    return schema.validate(request);
}