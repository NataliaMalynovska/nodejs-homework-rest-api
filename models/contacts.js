// const fs = require('fs/promises')

const { v4: uuidv4 } = require("uuid");
uuidv4();
const contacts = require("./contacts.json");

const listContacts = async (req, res) => {
	res.status(200).json(contacts);
};

const getContactById = async ( contactId ) => {
	const { contactId } = req.params;
	const contactById  = contacts.find(({ id }) => id ===  contactId );

	if (!contactById ) {
		return res.status(404).json({ message: "Not found" });
	}
	res.status(200).json(contactById );
};

const removeContact = async (contactId) => {

};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
