/************************* asign  jwt token for API **************************/
require("dotenv").config();
const jwt = require("jsonwebtoken");

//assign jwt token for API
exports.assign_token = (props) => {
  const token = jwt.sign(props, process.env.JWT_SECRET);
  return token;
};
