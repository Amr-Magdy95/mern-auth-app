const UserController = require("../controllers/user.controller");
const router = require("express").Router();

router.get("/", UserController.test);

module.exports = router;
