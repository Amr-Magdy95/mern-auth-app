const router = require("express").Router();
const AuthController = require("../controllers/auth.controller");
const { query, body } = require("express-validator");

router.post(
  "/signup",
  [
    body("username").notEmpty().escape().withMessage("Username is not valid"),
    body("email").isEmail().withMessage("Email is not valid"),
    body("password").isLength({ min: 6 }).withMessage("Password is not valid"),
  ],
  AuthController.signup
);

router.post(
  "/signin",
  [
    body("email").isEmail().withMessage("Email is not valid"),
    body("password").isLength({ min: 6 }).withMessage("Password is not valid"),
  ],
  AuthController.signin
);

router.post(
  "/google",

  AuthController.google
);

module.exports = router;
