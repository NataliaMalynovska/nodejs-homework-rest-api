const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const Conflict = require("http-errors");
const Unauthorized = require("http-errors");
const path = require("path");
const fs = require("fs/promises");

const { SECRET_KEY } = process.env;

const signup = async (req, res) => {
	const { password, email, subscription } = req.body;
	const user = await User.findOne({ email });
	if (user) {
		throw new Conflict("Email in use");
	}
	const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
	const avatarURL = gravatar.url(email);
	const result = await User.create({
		password: hashPassword,
		email,
		subscription,
		avatarURL,
	});
	res.status(200).json({
		Status: "Created",
		Code: 201,
		ResponseBody: {
			user: {
				email: email,
				avatarURL,
				subscription: subscription,
			},
		},
	});
};
const login = async (req, res) => {
	const { password, email, subscription } = req.body;
	const user = await User.findOne({ email });
	if (!user || !user.comparePassword(password)) {
		throw new Unauthorized("Email or password is wrong");
	}
	// if (!user) {
	// 	throw new Unauthorized("Email is wrong");
	// }
	// const passCompare= bcrypt.compareSync(password, user.password);
	// if (!passCompare) {
	// 	throw new Unauthorized("Password is wrong");
	// }
	// const result = await User.create({
	// 	password: hashPassword,
	// 	email,
	// 	subscription,
	// });
	// res.status(200).json({
	// 	Status: "Ok",
	// 	Code: 200,
	// 	ResponseBody: {
	// 		token: token,
	// 		user: {
	// 			email: email,
	// 			subscription: subscription,
	// 		},
	// 	},
	// });
	const payload = {
		id: user._id,
	};
	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
	await User.findByIdAndUpdate(user._id, { token });
	res.json({
		status: "success",
		code: 200,
		data: {
			token,
		},
	});
};
const getCurrent = async (req, res) => {
	console.log(req.user);
	const { email, subscription } = req.user;
	res.json({
		status: "success",
		code: 200,
		data: {
			email,
			subscription,
		},
	});
};
const logout = async (req, res) => {
	const { _id } = req.user;
	await User.findByIdAndUpdate(_id, { token: null });
	res.status(204).json();
};
const updateUserSubscription = async (req, res, next) => {
	const { subscription } = req.body;
	const { _id } = req.user;
	const updatedUser = await User.findByIdAndUpdate(
		_id,
		{ subscription },
		{ new: true }
	);

	return res.status(200).json({
		data: {
			updatedUser,
		},
	});
};
const avatarDir = path.join(__dirname, "../", "public", "avatars");

const updateAvatar = async (req, res) => {
	const { path: tempUpload, originalname } = req.file;
	const { _id: id } = req.user;
	const imageName = `${id}_${originalname}`;
	try {
		const resultUpload = path.join(avatarDir, imageName);
		await fs.rename(tempUpload, resultUpload);
		const avatarURL = path.join("public", "avatars", imageName);
		await User.findByIdAndUpdate(req.user._id, { avatarURL });
		res.json({ avatarURL });
	} catch (error) {
		await fs.unlink(tempUpload);
		throw error;
	}
};
module.exports = {
	signup,
	login,
	getCurrent,
	logout,
	updateAvatar,
	updateUserSubscription,
};
