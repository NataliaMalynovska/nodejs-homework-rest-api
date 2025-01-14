const express = require("express");
const router = express.Router();
const { tryCatchWrapper } = require("../../helpers/index");

const { auth } = require("../../middlewares/users");
const {
	addContactValidation,
	updateContactValidation,
} = require("../../middlewares/validationMiddleware");
const {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
	updateStatusContact,
} = require("../../controllers/contactsController");

router.get("/", auth, tryCatchWrapper(listContacts));

router.get("/:contactId", tryCatchWrapper(getContactById));

router.post("/", auth, addContactValidation, tryCatchWrapper(addContact));

router.delete("/:contactId", tryCatchWrapper(removeContact));

router.put(
	"/:contactId",
	updateContactValidation,
	tryCatchWrapper(updateContact)
);
router.patch(
	"/:contactId",
	updateContactValidation,
	tryCatchWrapper(updateStatusContact)
);

module.exports = router;
