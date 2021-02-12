const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

// import handlers
const { getMessageStatus } = require("./handlers/getMessageStatus.handler");
const { postRegister } = require("./handlers/postRegister.handler");
const { getCommonStudents } = require("./handlers/getCommonStudents.handler");
const { postSuspend } = require("./handlers/postSuspend.handler");
const {
  postRetrieveForNotifications,
} = require("./handlers/postRetrieveForNotifications.handler");

app.use((req, res, next) => {
  jsonParser(req, res, err => {
      if (err) {
          return res.status(400).send({
            message: err
          }); // Bad request
      }
      next();
  });
});

module.exports = () => {
  app.get("/", getMessageStatus);
  // post register
  app.post("/api/register", jsonParser, postRegister);

  // get commonstudents
  app.get("/api/commonstudents", getCommonStudents);

  // post suspend
  app.post("/api/suspend", jsonParser, postSuspend);

  // post notification
  app.post(
    "/api/retrievefornotifications",
    jsonParser,
    postRetrieveForNotifications
  );

  return app;
};
