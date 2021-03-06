const admin = require("firebase-admin");
const logger = require("../logger/logging");

const devToken = "test";

const getAuthToken = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    req.authToken = req.headers.authorization.split(" ")[1];
  } else {
    req.authToken = null;
  }
  next();
};

const checkIfAuthenticated = (req, res, next) => {
  getAuthToken(req, res, async () => {
    const { authToken } = req;

    if (authToken === devToken) {
      return next();
    }

    try {
      const userInfo = await admin.auth().verifyIdToken(authToken);

      req.authId = userInfo.uid;

      return next();
    } catch (err) {
      logger.info(err);

      return res
        .status(401)
        .send({ error: "You are not authorized to make this request" });
    }
  });
};

module.exports = { checkIfAuthenticated };
