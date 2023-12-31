const CustomAPIError = require("../errors/CustomAPIError");
module.exports = (err, req, res, next) => {
  if (!err instanceof CustomAPIError)
    (err.code = 500), (err.message = "Something went wrong");

  res.status(err.code).json({ message: err.message });
};
