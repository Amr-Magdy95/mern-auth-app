const CustomAPIError = require("../errors/CustomAPIError");
module.exports = (err, req, res, next) => {
  return res
    .status(err.code || 500)
    .json({ message: err.message || "Something went wrong" });
};
