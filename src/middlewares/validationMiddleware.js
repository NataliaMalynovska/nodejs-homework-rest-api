const Joi = require("joi");

module.exports = {
	addContactValidation: (req, res, next) => {
		const schema = Joi.object({
			name: Joi.string().trim().min(3).max(26).required(),
			email: Joi.string()
				.trim()
				.email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
				.required()
				.messages({
					"string.email": "{{#label}} must be a valid email",
				}),
			phone: Joi.string()
				.trim()
				.regex(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/)
				.required()
				.messages({
					"string.base": `"" should be a type of string`,
					"string.empty": `"" must contain value`,
					"string.pattern.base": `"" must be 10 digit number`,
					"any.required": `"" is a required field`,
				}),
			favorite: Joi.boolean(),
		});
		const validationResult = schema.validate(req.body);
		if (validationResult.error) {
			return res.status(400).json({ status: validationResult.error.details });
		}
		next();
	},
	updateContactValidation: (req, res, next) => {
		const schema = Joi.object({
			name: Joi.string().trim().min(3).max(26).required(),
			email: Joi.string()
				.trim()
				.email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
				.required()
				.messages({
					"string.email": "{{#label}} must be a valid email",
				}),
			phone: Joi.string()
				.trim()
				.regex(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/)
				.required()
				.messages({
					"string.base": `"" should be a type of string`,
					"string.empty": `"" must contain value`,
					"string.pattern.base": `"" must be 10 digit number`,
					"any.required": `"" is a required field`,
				}),
			favorite: Joi.boolean(),
		}).min(1);
		const validationResult = schema.validate(req.body);
		if (validationResult.error) {
			return res.status(400).json({ status: validationResult.error.details });
		}
		next();
	},
};
