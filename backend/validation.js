/************************************ Common validation ********************************/
const validator = require("validator");

// check all validations
exports.checkallvalidation = (props) => {
  for (let items in props) {
    if (Array.isArray(props[items])) {
      for (let index = 0; index < props[items].length; index++) {
        for (const key in props[items][index]) {
          if (!validator.isEmpty(props[items][index][key])) {
            return false;
          }
        }
      }
    } else {
      if (!validator.isEmpty(props[items])) {
        return false;
      }
    }
  }
  return true;
};

//validation for Empty value
exports.isEmpty = (props) => {
  return props === null || props === "" || props.toString().trim() === ""
    ? "Please fill out this field."
    : "";
};

// name validation
exports.validateName = (props) => {
  //check field is empty string ?
  if (validator.isEmpty(props) || props.trim() === "") {
    return "Please fill out this field.";
  }

  // check field  sholud be atleast 2 characters in length
  else if (props.length < 2) {
    return "field must be at least 2 characters in length";
  }

  // check field sholud not exceed 50 characters in length
  else if (props.length > 225) {
    return "field cannot exceed 225 characters in length";
  }

  // check field should not contain more than one white space consecutively
  else if (props.match(/([\s]{2})/)) {
    return "field should not contain more than one white space consecutively";
  }

  // check field should not contain more than one white space consecutively
  else if (props.match(/([.]{2})/)) {
    return "field should not contain more than one dot consecutively";
  }
  // check field should not contain more than two letters consecutively
  else if (props.match(/([a-z])\1{2,}/i)) {
    return "field should not contain more than two repeated alphabetic letters consecutively";
  }

  // check field only contain alphabetic letters and spaces
  else if (!props.match(/^[[a-z\s.]+$/i)) {
    return " field  only contain  alphabetical letters and dot";
  } else {
    return "";
  }
};

//email validation
exports.validateEmail = (props) => {
  if (validator.isEmpty(props)) {
    return "Please fill out this field";
  } else if (!validator.isEmail(props)) {
    return "Please enter valid email id";
  } else {
    return "";
  }
};

// validate contact No
exports.validateContactNo = (props) => {
  if (validator.isEmpty(props)) {
    return "Please fill out this field";
  }
  // validation for india and bangladesh
  else if (!validator.isMobilePhone(props, ["en-IN", "bn-BD"])) {
    return "Please enter valid contact Number.";
  } else {
    return "";
  }
};

//password validation
exports.validatePassword = (props) => {
  if (validator.isEmpty(props)) {
    return "Please fill out this field.";
  }

  //password length should be minimum 8 characters.
  else if (props.length < 8) {
    return "Length should be minimum 8 characters";
  }

  //check password contain atleast one numeric character
  else if (!props.match(/[0-9]+/)) {
    return "The password must include atleast one numeric character";
  }

  //check password contain atleast one alphabetic letter
  else if (!props.match(/[a-z]+/)) {
    return "The password must include atleast one Alphabetic letter";
  }

  // check password contain atleast one capital letter
  else if (!props.match(/[A-Z]+/)) {
    return "The password must include atleast one capital letter";
  }

  // check password contain atleast one special character
  else if (!props.match(/[\W]+/)) {
    return "The password must include atleast one special character";
  }

  // check password should not contain any white space
  else if (props.match(/[\s]/)) {
    return "The password should not contain white space";
  } else {
    return "";
  }
};

