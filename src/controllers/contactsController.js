const { Contact } = require("../models/contacts");
const createError = require("http-errors");

const listContacts = async (req, res) => {
	const { _id } = req.user;
	const { page = 1, limit = 10 } = req.query;
	const skip = (page - 1) * limit;
	const contacts = await Contact.find({ owner: _id }, "", {
		skip,
		limit: Number(limit),
	}).populate("owner", "_id email");
	res.json({ status: "success", code: 200, data: { contacts } });
};

const getContactById = async (req, res) => {
	const { contactId } = req.params;
	const contactById = await Contact.findOne({ _id: contactId });
	if (!contactById) {
		throw createError(404, "Not found");
	}
	res.status(200).json({ status: "success", code: 200, data: { contactById } });
};
const removeContact = async (req, res) => {
	const { contactId } = req.params;
	const contactByDelete = await Contact.findById(contactId);
	if (!contactByDelete) {
		throw createError(404, "Not found");
	}
	await Contact.findByIdAndDelete({ _id: contactId });
	res.status(200).json({
		status: "success",
		code: 200,
		message: "contact deleted",
		data: { contactByDelete },
	});
};

const addContact = async (req, res) => {
	const { _id } = req.user;
	const newContact = await Contact.create({ ...req.body, owner: _id });
	res.status(201).json({ status: "success", code: 201, data: { newContact } });
};

const updateContact = async (req, res) => {
	const { contactId } = req.params;
	const contactUpdate = await Contact.findByIdAndUpdate(contactId, req.body, {
		new: true,
	});
	return res.json({ data: { contact: contactUpdate } });
};

const updateStatusContact = async (req, res) => {
	const { contactId } = req.params;
	const { favorite } = req.body;
	if (!favorite) {
		throw createError(404, { message: "missing field favorite" });
	}
	const contacStatustUpdate = await Contact.findByIdAndUpdate(
		contactId,
		{ favorite },
		{ new: true }
	);
	// if (!contacStatustUpdate) {
	// 	throw createError(404, "Not found");
	// }
	return res.json({
		status: "success",
		code: 200,
		data: { contact: contacStatustUpdate },
	});
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
	updateStatusContact,
};
