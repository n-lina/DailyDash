const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

const logger = require("./logger/logging");
require("./db/database");
require("./firebase/firebase");

const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const goals = require("./goals/goals");
const users = require("./users/users");

app.use("/goals", goals);
app.use("/users", users);

var server = app.listen(port, () => {
  logger.info("Server listening on port ${port}!");
});

module.exports = server;
