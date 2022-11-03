// const fs = require('fs/promises')
const createError = require("http-errors");
const { v4 } = require("uuid");
let contacts = require("./contacts.json");

const listContacts = async (req, res, next) => {
	try {
		res.json({
			status: "success",
			code: 200,
			data: {
				contacts,
			},
		});
	} catch (error) {
		next(error);
	}
};

const getContactById = async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const contactById = contacts.find(({ id }) => id === contactId);
		if (!contactById) {
			throw createError(404, "Not found");
		}
		res
			.status(200)
			.json({ status: "success", code: 200, data: { contactById } });
	} catch (error) {
		next(error);
	}
};
const removeContact = async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const contactByDelete = contacts.find(({ id }) => id === contactId);
		if (!contactByDelete) {
			throw createError(404, "Not found");
		}
		contacts = contacts.filter(({ id }) => id !== contactId);
		res.status(200).json({
			status: "success",
			code: 200,
			message: "contact deleted",
			contacts,
		});
	} catch (error) {
		next(error);
	}
};

const addContact = async (req, res, next) => {
	try {
		const { name, email, phone } = req.body;
		const newContacts = { id: v4(), name, email, phone };
		contacts.push(newContacts);
		res
			.status(201)
			.json({ status: "success", code: 201, data: { newContacts } });
	} catch (error) {
		next(error);
	}
};

const updateContact = async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const contactUpdate = contacts.find(
			({ id }) => id === contactId.toString()
		);
		const { name, email, phone } = req.body;

		if (!name || !email || !phone) {
			return res.status(400).json({ message: "missing fields" });
		} else if (!contactUpdate) {
			res.json({
				status: "error",
				code: 400,
				message: "Not found",
			});
		}

		contacts.forEach((contact) => {
			if (contact.id === contactId) {
				contact.name = name;
				contact.email = email;
				contact.phone = phone;

				res.status(200).json(contactUpdate);
			}
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
