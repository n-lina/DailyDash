const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const logger = require("./logger/logging");
const admin = require("firebase-admin");
const UserModel = require("./models/users");
const GoalModel = require("./models/goals");
require("./db/database");
require("./firebase/firebase");

const app = express();

const notificationTitle = "Reminder from DailyDash!";

const port = 8000;

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => logger.info(`Server listening on port ${port}!`));

const sendMessage = (registrationToken, title, body) => {
  var message = {
    notification: {
      title,
      body
    },
    token: registrationToken
  };

  logger.info(message);

  // Send a message to the device corresponding to the provided
  // registration token.
  admin
    .messaging()
    .send(message)
    .then((response) => {
      // Response is a message ID string.
      logger.info("Successfully sent message:", response);
    })
    .catch((error) => {
      logger.info("Error sending message:", error);
    });
};

const sendNotifications = async () => {
  const options = { weekday: "long" };
  const day = new Date()
    .toLocaleTimeString("en-us", options)
    .substr(0, 3)
    .toLowerCase();

  const allUsers = await UserModel.find();

  allUsers.forEach(async function (user) {
    const userGoals = await GoalModel.find({ userId: user.userId });
    const userRegistrationToken = user.notificationId;

    if (userRegistrationToken !== "") {
      userGoals.forEach(function (userGoal) {
        userGoal.shortTermGoals.forEach(function (shortTermGoal) {
          const shortTermGoalTitle = shortTermGoal.title;

          shortTermGoal[day].forEach(function (time) {
            const currentTimeDate = new Date();
            const currentHour = currentTimeDate.getHours();
            const currentMinute = currentTimeDate.getMinutes();
            const notificationHour = parseInt(time / 60, 10);
            const notificationMinute = time % 60;

            logger.info(
              "Notification Time: " +
                notificationHour +
                ":" +
                notificationMinute
            );
            logger.info("Current Time: " + currentHour + ":" + currentMinute);

            if (
              currentHour === notificationHour &&
              currentMinute === notificationMinute
            ) {
              sendMessage(
                userRegistrationToken,
                notificationTitle,
                shortTermGoalTitle
              );
            }
          });
        });
      });
    }
  });
};

const runServer = () => {
  setInterval(sendNotifications, 60000);
};

runServer();

module.exports.app = app;
