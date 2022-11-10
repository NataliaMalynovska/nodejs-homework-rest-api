const { User } = require("../models/user");
const Conflict = require("http-errors");

const signup = async (req, res) => {
	const { password, email, subscription } = req.body;
	const user = await User.findOne({ email });
	if (user) {
		throw new Conflict("Email in use");
	}
	const result = await User.create({ password, email, subscription });
	res.status(201).json({
		Status: "Created",
    Code: 201,
		ResponseBody: {
			user: {
				email: `${email}`,
				subscription: `${subscription}`,
			},
		},
	});
};
module.exports = {
	signup,
};
