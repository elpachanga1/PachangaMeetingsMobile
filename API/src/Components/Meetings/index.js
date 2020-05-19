const store = require("../../Persistence/postgres");
const ctrl = require("./controller");

module.exports = ctrl(store);
