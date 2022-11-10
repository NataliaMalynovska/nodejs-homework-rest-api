const express = require("express");
const router = express.Router();
const { tryCatchWrapper } = require("../../helpers/index");
// const {
// 	addContactValidation,
// 	updateContactValidation,
// } = require("../../middlewares/validationMiddleware");
const {
  signup 
} = require("../../controllers/authController");

router.post("/signup", tryCatchWrapper(signup));
router.post("/login", tryCatchWrapper());
router.post("/logout", tryCatchWrapper());
router.post("/current", tryCatchWrapper());

module.exports = router;