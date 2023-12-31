const UserController = require("../controllers/userController");
const router = require("express").Router();

router.get("/", UserController.test);

module.exports = router;
