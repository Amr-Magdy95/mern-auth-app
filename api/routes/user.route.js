const UserController = require("../controllers/user.controller");
const router = require("express").Router();
const { body } = require("express-validator");
const { verifyToken } = require("../middleware/verifyToken");

router.get("/", UserController.test);
router.post("/update/:id", [verifyToken], UserController.updateUser);
router.delete("/delete/:id", [verifyToken], UserController.deleteUser);

module.exports = router;
