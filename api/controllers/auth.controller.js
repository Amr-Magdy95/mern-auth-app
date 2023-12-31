const User = require("../models/user.model");
const CustomAPIError = require("../errors/CustomAPIError");
const { StatusCodes } = require("http-status-codes");
const { validationResult, matchedData } = require("express-validator");

exports.signup = async (req, res) => {
  // validate data received in request body
  const validationRes = validationResult(req);
  console.log(validationRes.array());
  if (!validationRes.isEmpty())
    throw new CustomAPIError(
      validationRes.array().map((res) => res.msg),
      StatusCodes.BAD_REQUEST
    );

  let data = matchedData(req);

  // check whether user is already registered
  // if new user, register and hash password
};
