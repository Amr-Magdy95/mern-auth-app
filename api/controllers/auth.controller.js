const User = require("../models/user.model");
const CustomAPIError = require("../errors/CustomAPIError");
const { StatusCodes } = require("http-status-codes");
const { validationResult, matchedData } = require("express-validator");
const bcryptjs = require("bcryptjs");

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
  res
    .status(StatusCodes.CREATED)
    .json({ message: `User ${newUser.username} created successfully...` });
};

exports.signin = async (req, res) => {
  // validate data received in request body
  const validationRes = validationResult(req);
  if (!validationRes.isEmpty())
    throw new CustomAPIError(
      validationRes.array().map((res) => res.msg),
      StatusCodes.BAD_REQUEST
    );
  let data = matchedData(req);

  // check whether the credentials are correct
  const { email, password } = data;
  const foundEmail = await User.findOne({ email }).exec();
  if (!foundEmail)
    throw new CustomAPIError("Invalid Credentials", StatusCodes.UNAUTHORIZED);
  const passwordMatch = await bcryptjs.compare(password, foundEmail.password);
  if (!passwordMatch)
    throw new CustomAPIError("Invalid Credentials", StatusCodes.UNAUTHORIZED);
  // Grant user access
  ({ password: hashedPassword, ...rest } = foundEmail._doc);
  const accessToken = foundEmail.accessToken();
  res
    .status(StatusCodes.OK)
    .cookie("access_token", accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    })
    .json(rest);
};
