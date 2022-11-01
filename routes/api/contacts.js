const express = require("express");
const { v4 } = require("uuid");
// const { request } = require("../../app");
const contacts = require("../../models/contacts.json");
const router = express.Router();

router.get("/", async (req, res, next) => {
	res.json({
		status: "success",
		code: 200,
		data: {
			contacts,
		},
	});
});

router.get("/:contactId", async (req, res, next) => {
	const { contactId } = req.params;
	const contactById = contacts.find(({ id }) => id === contactId);
	if (!contactById) {
		return res.status(404).json({ message: "Not found" });
	}
	res.status(200).json({ status: "success", code: 200, data: { contactById } });
});

router.post("/", async (req, res, next) => {
	const { name, email, phone } = req.body;
	const newContacts = { id: v4(), name, email, phone };
	contacts.push(newContacts);
	res.status(201).json({ status: "success", code: 201, data: { newContacts } });
});

router.delete("/:contactId", async (req, res, next) => {
	const { contactId } = req.params;
	const contactByDelete= contacts.find(({ id }) => id === contactId.toString());
  const { name, email, phone } = req.body
  
  if (!name || !email || !phone) {
    return res.status(400).json({"message": "missing fields"})
  } else if (!contactByDelete) {
    return res.status(404).json({"message": "Not found"})
  }

    contacts.forEach(contact => {
      if (contact.id === contactId) {
        contact.name = name
        contact.email = email
        contact.phone = phone

        res.status(200).json(contactByDelete)
      }
    })
});

router.put("/:contactId", async (req, res, next) => {
	res.json({ message: "template message" });
});

module.exports = router;
