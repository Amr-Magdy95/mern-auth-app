const User = require("../models/user.model");
const CustomAPIError = require("../errors/CustomAPIError");
const { StatusCodes } = require("http-status-codes");
const { validationResult, matchedData } = require("express-validator");

exports.test = (req, res) => {
  res.json({ message: "API is working" });
};

exports.updateUser = async (req, res) => {
  if (req.user.id !== req.params.id)
    throw new CustomAPIError(
      "You can Only Update your account",
      StatusCodes.UNAUTHORIZED
    );

  let updateObject = {};
  if (req.body?.username)
    updateObject = { ...updateObject, username: req.body.username };
  if (req.body?.password)
    updateObject = { ...updateObject, password: req.body.password };
  if (req.body?.email)
    updateObject = { ...updateObject, email: req.body.email };
  if (req.body?.profilePicture)
    updateObject = { ...updateObject, profilePicture: req.body.profilePicture };

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: updateObject,
    },
    { new: true }
  );

  const { password: tempPW, ...rest } = updatedUser._doc;
  res.status(StatusCodes.OK).json(rest);
};

exports.deleteUser = async (req, res) => {
  if (req.params?.id !== req.user.id)
    throw new CustomAPIError(
      "Cannot delete a different user",
      StatusCodes.UNAUTHORIZED
    );

  const user = await User.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ message: "user has been deleted..." });
};
