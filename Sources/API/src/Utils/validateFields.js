const error = require("./error");

function validateField(key, value) {
  if (!value) {
    throw error(`Field ${key} EMPTY`, 401);
  }
}

module.exports = {
  validateField,
};