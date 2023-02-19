import * as Joi from '@hapi/joi';

export const UserLogin = Joi.object({
    user: Joi.string().required(),
    password: Joi.string().required()
});

export const DespesasId = Joi.object({
    id: Joi.string().required()
});

export const DespesasPayload = Joi.object({
    id : Joi.string().trim().required(),
    description: Joi.string().required(),
    date: Joi.date().required(),
    value: Joi.number().required(),
});

export const DespesasUpdate = Joi.object({
    id : Joi.string().trim().required(),
    description: Joi.string(),
    date: Joi.date(),
    userId: Joi.string().trim().required(),
    value: Joi.number(),
});