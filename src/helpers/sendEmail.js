const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
	const email = { ...data, from: "natalimalinovska57@gmail.com" };
	try {
		await sgMail.send(email);
		return true;
	} catch (error) {
		throw error;
	}
};

module.exports = { sendEmail };
