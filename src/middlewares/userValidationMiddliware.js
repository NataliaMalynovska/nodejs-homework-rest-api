const Joi = require("joi");

module.exports = {
	userValidation: (req, res, next) => {
		const schema = Joi.object({
			email: Joi.string()
				.email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
				.required()
				.messages({
					"string.email": "{{#label}} must be a valid email",
				}),
			password: Joi.string().min(6).max(20).required(),
			subscription: Joi.string(),
			token: Joi.string(),
		});

		const validationResult = schema.validate(req.body);
		if (validationResult.error) {
			return res.status(400).json({ status: validationResult.error.details });
		}
		next();
	},
	verifyEmailValidation: (req, res, next) => {
		const schema = Joi.object({
			email: Joi.string()
				.trim()
				.email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
				.required(),
		});
		const validationResult = schema.validate(req.body);
		if (validationResult.error) {
			return res.status(400).json({ status: validationResult.error.details });
		}
		next();
	},
};
