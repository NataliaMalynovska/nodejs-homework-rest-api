const express = require("express");
const { tryCatchWrapper } = require("../../helpers/tryCatchWrapper");
const { auth } = require("../../middlewares/users");
const { upload } = require("../../middlewares/upload");
const {
	userValidation,
	verifyEmailValidation,
} = require("../../middlewares/userValidationMiddliware");

const {
	signup,
	login,
	getCurrent,
	logout,
	updateAvatar,
	updateUserSubscription,
	verifyEmail,
	resendVerifyEmail,
} = require("../../controllers/authController");

const router = express.Router();

router.post("/signup", userValidation, tryCatchWrapper(signup));
router.get("/verify/:verificationToken", tryCatchWrapper(verifyEmail));
router.post(
	"/verify/",
	verifyEmailValidation,
	tryCatchWrapper(resendVerifyEmail)
);
router.post("/login", userValidation, tryCatchWrapper(login));
router.get("/current", auth, tryCatchWrapper(getCurrent));
router.get("/logout", auth, tryCatchWrapper(logout));
router.patch(
	"/avatar",
	auth,
	upload.single("avatar"),
	tryCatchWrapper(updateAvatar)
);
router.patch("/update", auth, tryCatchWrapper(updateUserSubscription));

module.exports = router;
