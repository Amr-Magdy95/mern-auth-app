const User = require("../models/user.model");
const CustomAPIError = require("../errors/CustomAPIError");
const { StatusCodes } = require("http-status-codes");
const { validationResult, matchedData } = require("express-validator");

exports.signup = async (req, res) => {
  // validate data received in request body
  const validationRes = validationResult(req);
  if (!validationRes.isEmpty())
    throw new CustomAPIError(
      validationRes.array().map((res) => res.msg),
      StatusCodes.BAD_REQUEST
    );
  let data = matchedData(req);

  // check whether user is already registered
  const { username, email, password } = data;
  const foundEmail = await User.findOne({ email }).exec();
  const foundUsername = await User.findOne({ username }).exec();
  if (foundEmail || foundUsername)
    throw new CustomAPIError(
      "Username and email must be unique",
      StatusCodes.CONFLICT
    );
  // if no user, register and hash password
  const newUser = await User.create(data);
  res.status(StatusCodes.CREATED).json(newUser);
};
