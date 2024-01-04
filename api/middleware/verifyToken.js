const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/CustomAPIError");
const { StatusCodes } = require("http-status-codes");

exports.verifyToken = (req, res, next) => {
  const token = req?.cookies?.access_token;
  if (!token)
    throw new CustomAPIError("Access Denied!", StatusCodes.UNAUTHORIZED);

  jwt.verify(token, process.env.ACCESS_SECRET, (err, user) => {
    if (err)
      throw new CustomAPIError("Access Denied!", StatusCodes.UNAUTHORIZED);

    req.user = user;
    next();
  });
};
