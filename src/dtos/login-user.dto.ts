import Joi from '@hapi/joi';

const validationUserSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,}$'))
        .required()
})


export default validationUserSchema;